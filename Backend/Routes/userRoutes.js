const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");
const userController = require("../Controllers/userRoutes");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/user/animes:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtenir la liste des animes d'un utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des animes de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
router.get("/animes", auth, userController.getAnimesByUser);

module.exports = router;
