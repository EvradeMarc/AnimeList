const express = require("express");
const router = express.Router();
const listPersoController = require("../Controllers/listPersoController");
const auth = require("../Middlewares/auth");

router.post("/create", auth, listPersoController.createListPerso);
router.get("/", auth, listPersoController.getListPersoByUser);
router.post(
  "/:listId/add-anime",
  auth,
  listPersoController.addAnimeToListPerso
);
router.post(
  "/:listId/remove-anime",
  auth,
  listPersoController.removeAnimeFromListPerso
);
router.delete("/:listId", auth, listPersoController.deleteListPerso);
module.exports = router;
