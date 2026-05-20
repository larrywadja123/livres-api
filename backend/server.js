const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./config/db");

const ouvrageRoutes = require("./routes/ouvrages");
const authRoutes = require("./routes/auth");
const categorieRoutes = require("./routes/categories");
const avisRoutes = require("./routes/avis");
const panierRoutes = require("./routes/panier");
const commandeRoutes = require("./routes/commandes");
const listeRoutes = require("./routes/listes");
const commentaireRoutes = require("./routes/commentaires");

// IMPORTANT
app.use(cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ouvrages", ouvrageRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/panier", panierRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/listes", listeRoutes);
app.use("/api/commentaires", commentaireRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("API fonctionne !");
});

// SERVEUR
app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});