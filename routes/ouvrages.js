const express = require("express");
const router = express.Router();
const ouvrage = require("../controllers/ouvrageController");
const auth = require("../middlewares/auth");
const { validate, ouvrageSchema } = require("../middlewares/validation");

// GET
router.get("/", ouvrage.getAll);
router.get("/:id", ouvrage.getOne);

// POST (protégé)
router.post("/", auth, ouvrage.create);

// PUT
router.put("/:id", auth, ouvrage.update);

// DELETE
router.delete("/:id", auth, ouvrage.delete);

router.post("/", auth, validate(ouvrageSchema), ouvrage.create);

module.exports = router;
