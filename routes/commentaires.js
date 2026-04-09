const express = require("express");
const router = express.Router();
const commentaire = require("../controllers/commentaireController");
const auth = require("../middlewares/auth");

// ajouter commentaire
router.post("/ouvrages/:id/commentaires", auth, commentaire.create);

// valider commentaire
router.put("/:id/valider", auth, commentaire.valider);

module.exports = router;