const express = require("express");
const router = express.Router();
const cat = require("../controllers/categorieController");
const auth = require("../middlewares/auth");

router.get("/", cat.getAll);
router.post("/", auth, cat.create);
router.put("/:id", auth, cat.update);
router.delete("/:id", auth, cat.delete);

module.exports = router;