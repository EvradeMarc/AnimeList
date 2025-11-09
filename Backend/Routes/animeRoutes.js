const express = require("express");
const router = express.Router();
const animeController = require("../Controllers/animeController");

router.post("/create", animeController.createAnime);
router.get("/", animeController.getAnimes);
router.put("/update/:id", animeController.updateAnime);
router.delete("/delete/:id", animeController.deleteAnime);
router.get("/:id", animeController.getAnimeById);

module.exports = router;
