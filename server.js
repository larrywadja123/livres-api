const express = require("express");
const app = express();

const db = require("./config/db");
const authMiddleware = require("./middlewares/auth");
const ouvrageRoutes = require("./routes/ouvrages");
const authRoutes = require("./routes/auth");
const categorieRoutes = require("./routes/categories");
const avisRoutes = require("./routes/avis");
const panierRoutes = require("./routes/panier");
const commandeRoutes = require("./routes/commandes");
const listeRoutes = require("./routes/listes");
const commentaireRoutes = require("./routes/commentaires");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ouvrages", ouvrageRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/panier", panierRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/listes", listeRoutes);
app.use("/api/commentaires", commentaireRoutes);


app.use(express.json());




// TEST
app.get("/", (req, res) => {
  res.send("API fonctionne !");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Accès autorisé",
    user: req.user
  });
});

app.post("/test", (req, res) => {
  console.log("BODY TEST:", req.body);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});

