const express = require("express");
const router = express.Router();
const liste = require("../controllers/listeController");
const auth = require("../middlewares/auth");

router.post("/", auth, liste.create);
router.get("/:code", liste.getByCode);
router.post("/:id/acheter", liste.acheter);

module.exports = router;