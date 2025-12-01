const express = require("express");
const router = express.Router();
const userController = require("../Controllers/authController");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupInput'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Requête invalide
 */
router.post("/signup", userController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Se connecter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", userController.login);

module.exports = router;
