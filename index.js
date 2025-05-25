const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook-fedapay', (req, res) => {
  console.log("✅ Paiement reçu :", req.body);

  // Ici, tu peux enregistrer dans une base, envoyer un mail, etc.
  
  res.status(200).send('ok');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Webhook lancé sur le port ${PORT}`);
});
