const express = require("express");
const router = express.Router();
const animeController = require("../Controllers/animeController");
const auth = require("../Middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: Animes
 *     description: Gestion des animes
 */

/**
 * @swagger
 * /api/animes/create:
 *   post:
 *     tags:
 *       - Animes
 *     summary: Créer un nouvel anime
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnimeInput'
 *     responses:
 *       201:
 *         description: Anime créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       401:
 *         description: Non autorisé
 */
router.post("/create", auth, animeController.createAnime);

/**
 * @swagger
 * /api/animes:
 *   get:
 *     tags:
 *       - Animes
 *     summary: Obtenir la liste des animes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste d'animes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 */
router.get("/", auth, animeController.getAnimes);

/**
 * @swagger
 * /api/animes/{id}:
 *   get:
 *     tags:
 *       - Animes
 *     summary: Obtenir un anime par ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'anime
 *     responses:
 *       200:
 *         description: Anime trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       404:
 *         description: Anime non trouvé
 */
router.get("/:id", auth, animeController.getAnimeById);

/**
 * @swagger
 * /api/animes/update/{id}:
 *   put:
 *     tags:
 *       - Animes
 *     summary: Mettre à jour un anime
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'anime à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnimeInput'
 *     responses:
 *       200:
 *         description: Anime mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anime'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Anime non trouvé
 */
router.put("/update/:id", auth, animeController.updateAnime);

/**
 * @swagger
 * /api/animes/delete/{id}:
 *   delete:
 *     tags:
 *       - Animes
 *     summary: Supprimer un anime
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'anime à supprimer
 *     responses:
 *       200:
 *         description: Anime supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Anime non trouvé
 */
router.delete("/delete/:id", auth, animeController.deleteAnime);

module.exports = router;
