const db = require("../config/db");

//  Créer une liste
exports.create = (req, res) => {
  const proprietaire_id = req.user.id;
  const { nom } = req.body;

  const code_partage = Math.random().toString(36).substring(2, 8);

  db.query(
    "INSERT INTO listes_cadeaux (nom, proprietaire_id, code_partage, date_creation) VALUES (?, ?, ?, NOW())",
    [nom, proprietaire_id, code_partage],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Liste créée",
        code_partage: code_partage
      });
    }
  );
};

// Consulter une liste par code
exports.getByCode = (req, res) => {
  const code = req.params.code;

  db.query(
    "SELECT * FROM listes_cadeaux WHERE code_partage=?",
    [code],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json("Liste non trouvée");
      }

      res.json(result[0]);
    }
  );
};

// 🛒 Acheter depuis une liste
exports.acheter = (req, res) => {
  const liste_id = req.params.id;

  db.query(
    "SELECT * FROM liste_items WHERE liste_id=?",
    [liste_id],
    (err, items) => {
      if (err) return res.status(500).json(err);

      if (items.length === 0) {
        return res.status(400).json("Liste vide");
      }

      res.json("Achat simulé depuis la liste");
    }
  );
};
