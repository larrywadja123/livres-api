
    


const db = require("../config/db");

// 🔹 GET tous les ouvrages (stock > 0)
exports.getAll = (req, res) => {
  db.query("SELECT * FROM ouvrages WHERE stock > 0", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 🔹 GET un ouvrage
exports.getOne = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM ouvrages WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// 🔹 CREATE ouvrage
exports.create = (req, res) => {
  const { titre, auteur, prix, stock, categorie_id } = req.body;

  db.query(
    "INSERT INTO ouvrages (titre, auteur, prix, stock, categorie_id) VALUES (?, ?, ?, ?, ?)",
    [titre, auteur, prix, stock, categorie_id],
    (err, result) => {
      if (err) {
        console.log("ERREUR SQL :", err);
        return res.status(500).json(err);
      }
      res.json("Ouvrage ajouté");
    }
  );
};

// 🔹 UPDATE ouvrage
exports.update = (req, res) => {
  const id = req.params.id;
  const { titre, auteur, prix, stock } = req.body;

  db.query(
    "UPDATE ouvrages SET titre=?, auteur=?, prix=?, stock=? WHERE id=?",
    [titre, auteur, prix, stock, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json("Ouvrage modifié");
    }
  );
};

// 🔹 DELETE ouvrage
exports.delete = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM ouvrages WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json("Ouvrage supprimé");
  });
};