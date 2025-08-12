const express = require('express');
const axios = require('axios');
const router = express.Router();

let scores = [];

// Charger les chats depuis l’URL au démarrage
async function loadCats() {
    try {
        const res = await axios.get('https://data.latelier.co/cats.json');
        scores = res.data.images.map(cat => ({
            ...cat,
            score: 0
        }));
        console.log('Chats chargés depuis l’API externe.');
    } catch (err) {
        console.error('Erreur lors du chargement des chats :', err.message);
    }
}

// Récupère tous les chats
router.get('/cats', (req, res) => {
    res.json(scores);
});

// Vote pour un chat
router.post('/vote', (req, res) => {
    const { winnerId } = req.body;
    const cat = scores.find(c => c.id === winnerId);
    if (cat) {
        cat.score += 1;
        return res.json({ success: true, scores });
    }
    res.status(404).json({ success: false, message: 'Chat non trouvé' });
});

// Classement
router.get('/leaderboard', (req, res) => {
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    res.json(sorted);
});

// Charger les chats au démarrage
loadCats();

module.exports = router;
