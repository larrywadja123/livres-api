const db = require("../config/db");

// 🛒 GET panier
exports.getPanier = (req, res) => {
  const client_id = req.user.id;

  const sql = `
    SELECT p.id as panier_id, pi.*, o.titre
    FROM panier p
    JOIN panier_items pi ON p.id = pi.panier_id
    JOIN ouvrages o ON o.id = pi.ouvrage_id
    WHERE p.client_id = ? AND p.actif = true
  `;

  db.query(sql, [client_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ➕ Ajouter au panier
exports.addItem = (req, res) => {
  const client_id = req.user.id;
  const { ouvrage_id, quantite } = req.body;

  // 1. trouver panier actif
  db.query(
    "SELECT * FROM panier WHERE client_id=? AND actif=true",
    [client_id],
    (err, result) => {
      if (result.length === 0) {
        // créer panier
        db.query(
          "INSERT INTO panier (client_id, actif) VALUES (?, true)",
          [client_id],
          (err, resultInsert) => {
            const panier_id = resultInsert.insertId;

            insertItem(panier_id);
          }
        );
      } else {
        const panier_id = result[0].id;
        insertItem(panier_id);
      }

      function insertItem(panier_id) {
        db.query(
          "INSERT INTO panier_items (panier_id, ouvrage_id, quantite, prix_unitaire) VALUES (?, ?, ?, 0)",
          [panier_id, ouvrage_id, quantite],
          (err, result) => {
            if (err) return res.status(500).json(err);
            res.json("Ajouté au panier");
          }
        );
      }
    }
  );
};