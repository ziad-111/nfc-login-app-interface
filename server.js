const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Utilisateurs fictifs avec tokens
const users = {
    admin: { password: 'admin', token: 'token123' },
    user1: { password: 'password1', token: 'token456' }
};

// Route pour le login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        res.json({ success: true, message: 'Connexion réussie !', token: users[username].token });
    } else {
        res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }
});

// Route pour vérifier le token
app.post('/api/verify', (req, res) => {
    const { token } = req.body;
    const user = Object.keys(users).find(user => users[user].token === token);

    if (user) {
        res.json({ success: true, message: 'Token valide', user });
    } else {
        res.json({ success: false, message: 'Token invalide' });
    }
});

// Route pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
