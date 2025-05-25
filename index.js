app.post('/webhook-fedapay', async (req, res) => {
  const event = req.body;
  console.log('📥 Webhook reçu le', new Date().toISOString());
  console.log('Charge utile : ', event);

  const statut = event.statut ? event.statut.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

  console.log('statut brut:', event.statut);
  console.log('statut nettoyé:', statut);

  if (statut === 'succes') {
    const montant = event.montant || 0;
    const description = event.description || 'Pas de description';
    const numero = '22954978999';
    const apikey = '5302554';

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
