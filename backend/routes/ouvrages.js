const express = require("express");
const router = express.Router();

const ouvrage = require("../controllers/ouvrageController");

// GET TOUS LES OUVRAGES
router.get("/", ouvrage.getAll);

// GET UN OUVRAGE
router.get("/:id", ouvrage.getOne);

// AJOUTER
router.post("/", ouvrage.create);

// MODIFIER
router.put("/:id", ouvrage.update);

// SUPPRIMER
router.delete("/:id", ouvrage.delete);

module.exports = router;