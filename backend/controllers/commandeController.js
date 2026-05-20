const db = require("../config/db");

exports.createCommande = (req, res) => {
  const client_id = req.user.id;

  // 1. récupérer panier
  db.query(
    "SELECT * FROM panier WHERE client_id=? AND actif=true",
    [client_id],
    (err, panierRes) => {
      if (panierRes.length === 0) {
        return res.status(400).json("Panier vide");
      }

      const panier_id = panierRes[0].id;

      // 2. récupérer items
      db.query(
        "SELECT * FROM panier_items WHERE panier_id=?",
        [panier_id],
        (err, items) => {
          if (items.length === 0) {
            return res.status(400).json("Panier vide");
          }

          // 3. créer commande
          db.query(
            "INSERT INTO commandes (client_id, date, total, statut) VALUES (?, NOW(), 0, 'payee')",
            [client_id],
            (err, resultCmd) => {
              const commande_id = resultCmd.insertId;

              items.forEach(item => {
  // Ajouter commande item
  db.query(
    "INSERT INTO commande_items (commande_id, ouvrage_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)",
    [commande_id, item.ouvrage_id, item.quantite, item.prix_unitaire]
  );

  // 🔥 Décrémenter le stock
  db.query(
    "UPDATE ouvrages SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [item.quantite, item.ouvrage_id, item.quantite],
    (err, result) => {
      if (result.affectedRows === 0) {
        console.log("Stock insuffisant !");
      }
    }
  );
});

              res.json("Commande créée");
            }
          );
        }
      );
    }
  );
};