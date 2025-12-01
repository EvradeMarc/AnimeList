const express = require("express");
const router = express.Router();
const listPersoController = require("../Controllers/listPersoController");
const auth = require("../Middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: ListesPersonnelle
 *     description: Gestion des listes personnelles d'animes
 */

/**
 * @swagger
 * /api/lists/create:
 *   post:
 *     tags:
 *       - ListesPersonnelle
 *     summary: Créer une nouvelle liste personnelle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateListPersoInput'
 *     responses:
 *       201:
 *         description: Liste personnelle créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListPerso'
 *       401:
 *         description: Non autorisé
 */
router.post("/create", auth, listPersoController.createListPerso);

/**
 * @swagger
 * /api/lists/{listId}/add-anime:
 *   post:
 *     tags:
 *       - ListesPersonnelle
 *     summary: Ajouter un anime à une liste personnelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la liste personnelle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addAnimeToListPersoInput'
 *     responses:
 *       200:
 *         description: Anime ajouté à la liste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListPerso'
 *       401:
 *         description: Non autorisé
 */
router.post(
  "/:listId/add-anime",
  auth,
  listPersoController.addAnimeToListPerso
);

/**
 * @swagger
 * /api/lists/{listId}/remove-anime:
 *   post:
 *     tags:
 *       - ListesPersonnelle
 *     summary: Retirer un anime d'une liste personnelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la liste personnelle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/removeAnimeFromListPersoInput'
 *     responses:
 *       200:
 *         description: Anime retiré de la liste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListPerso'
 *       401:
 *         description: Non autorisé
 */
router.post(
  "/:listId/remove-anime",
  auth,
  listPersoController.removeAnimeFromListPerso
);

/**
 * @swagger
 * /api/lists/delete/{listId}:
 *   delete:
 *     tags:
 *       - ListesPersonnelle
 *     summary: Supprimer une liste personnelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la liste personnelle à supprimer
 *     responses:
 *       200:
 *         description: Liste personnelle supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Liste personnelle non trouvée
 */
router.delete("/delete/:listId", auth, listPersoController.deleteListPerso);
module.exports = router;
