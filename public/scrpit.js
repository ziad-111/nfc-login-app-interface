document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    const successElement = document.getElementById('success');

    // Afficher le message de demande de scanner la carte NFC
    messageElement.style.color = 'blue';
    messageElement.textContent = 'Veuillez scanner votre carte NFC...';

    // Ajout d'un délai pour simuler le temps de lecture de la carte NFC
    setTimeout(async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            messageElement.style.color = 'green';
            messageElement.textContent = result.message;
            successElement.style.display = 'flex'; // Afficher le cercle vert

            // Envoi de la requête de vérification du token
            const tokenResponse = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: result.token })
            });

            const tokenResult = await tokenResponse.json();
            if (tokenResult.success) {
                console.log('Token valide pour l\'utilisateur:', tokenResult.user);
            } else {
                console.log('Token invalide');
            }
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = result.message;
            successElement.style.display = 'none'; // Cacher le cercle vert en cas d'échec
        }
    }, 2000); // Simuler un délai de 2 secondes avant de continuer
});
