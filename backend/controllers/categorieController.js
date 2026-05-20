const db = require("../config/db");

// GET
exports.getAll = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// POST
exports.create = (req, res) => {
  const { nom, description } = req.body;

  db.query(
    "INSERT INTO categories (nom, description) VALUES (?, ?)",
    [nom, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Catégorie ajoutée");
    }
  );
};

// PUT
exports.update = (req, res) => {
  const id = req.params.id;
  const { nom, description } = req.body;

  db.query(
    "UPDATE categories SET nom=?, description=? WHERE id=?",
    [nom, description, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Catégorie modifiée");
    }
  );
};

// DELETE
exports.delete = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM categories WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json("Catégorie supprimée");
  });
};