const express = require("express");
const router = express.Router();
const animeController = require("../Controllers/animeController");
const auth = require("../Middlewares/auth");

router.post("/create", auth, animeController.createAnime);
router.get("/", auth, animeController.getAnimes);
router.put("/update/:id", auth, animeController.updateAnime);
router.delete("/delete/:id", auth, animeController.deleteAnime);
router.get("/:id", auth, animeController.getAnimeById);

module.exports = router;
