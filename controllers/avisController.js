const db = require("../config/db");

// ➕ Ajouter un avis
exports.create = (req, res) => {
  const client_id = req.user.id;
  const { ouvrage_id, note, commentaire } = req.body;

  // 🔍 Vérifier si le client a acheté
  const sqlCheck = `
    SELECT * FROM commande_items ci
    JOIN commandes c ON c.id = ci.commande_id
    WHERE c.client_id = ? AND ci.ouvrage_id = ?
  `;

  db.query(sqlCheck, [client_id, ouvrage_id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(403).json("Vous devez acheter ce livre pour laisser un avis");
    }

    // ✅ Ajouter avis
    db.query(
      "INSERT INTO avis (client_id, ouvrage_id, note, commentaire) VALUES (?, ?, ?, ?)",
      [client_id, ouvrage_id, note, commentaire],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json("Avis ajouté");
      }
    );
  });
};

// 📖 Voir tous les avis d’un ouvrage
exports.getByOuvrage = (req, res) => {
  const ouvrage_id = req.params.id;

  db.query(
    "SELECT * FROM avis WHERE ouvrage_id=?",
    [ouvrage_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};