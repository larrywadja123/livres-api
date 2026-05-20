const express = require("express");
const router = express.Router();
const panier = require("../controllers/panierController");
const auth = require("../middlewares/auth");

router.get("/", auth, panier.getPanier);
router.post("/items", auth, panier.addItem);

module.exports = router;