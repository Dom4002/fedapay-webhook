const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook-fedapay', async (req, res) => {
  const event = req.body;
  console.log('📥 Webhook reçu le', new Date().toISOString());
  console.log('Charge utile : ', event);

  if (event.statut === 'succès') {
    const montant = event.montant || 0;
    const description = event.description || 'Pas de description';
    const numero = '22954978999'; // Ton numéro WhatsApp (CallMeBot)
    const apikey = '5302554';     // Ta clé API CallMeBot

    const message = encodeURIComponent(`✅ Nouvelle commande validée !
Montant : ${montant} FCFA
🛍️ Détail : ${description}`);

    const url = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${message}&apikey=${apikey}`;

    try {
      await axios.get(url);
      console.log('📨 Message WhatsApp envoyé avec succès !');
    } catch (error) {
      console.error('❌ Erreur lors de l’envoi du message WhatsApp :', error.message);
    }
  } else {
    console.log('⛔ Paiement non validé, aucun message envoyé.');
  }

  res.status(200).send('ok');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur webhook Fedapay lancé sur le port ${PORT}`);
});
