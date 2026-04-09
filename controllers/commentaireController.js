const db = require("../config/db");

// ➕ Ajouter commentaire
exports.create = (req, res) => {
  const client_id = req.user.id;
  const ouvrage_id = req.params.id;
  const { contenu } = req.body;

  db.query(
    "INSERT INTO commentaires (client_id, ouvrage_id, contenu, valide) VALUES (?, ?, ?, false)",
    [client_id, ouvrage_id, contenu],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Commentaire ajouté (en attente validation)");
    }
  );
};

// ✅ Valider commentaire (éditeur)
exports.valider = (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE commentaires SET valide=true WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Commentaire validé");
    }
  );
};