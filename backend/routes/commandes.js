const express = require("express");
const router = express.Router();
const cmd = require("../controllers/commandeController");
const auth = require("../middlewares/auth");

router.post("/", auth, cmd.createCommande);

module.exports = router;