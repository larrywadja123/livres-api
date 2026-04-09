const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("BODY :", req.body); // 🔥 debug

  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json("Champs manquants");
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (nom, email, password_hash) VALUES (?, ?, ?)",
      [nom, email, hash],
      (err, result) => {
        if (err) {
          console.log("ERREUR SQL :", err);
          return res.status(500).json(err);
        }

        res.json("Utilisateur créé");
      }
    );
  } catch (err) {
    console.log("ERREUR :", err);
    res.status(500).json(err);
  }
};

exports.login = (req, res) => {
  res.send("login test");
};
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json("Utilisateur non trouvé");
    }

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json("Mot de passe incorrect");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
};
