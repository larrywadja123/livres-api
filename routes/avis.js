const express = require("express");
const router = express.Router();
const avis = require("../controllers/avisController");
const auth = require("../middlewares/auth");

// ➕ ajouter avis
router.post("/", auth, avis.create);

// 📖 voir avis d’un ouvrage
router.get("/ouvrage/:id", avis.getByOuvrage);

module.exports = router;