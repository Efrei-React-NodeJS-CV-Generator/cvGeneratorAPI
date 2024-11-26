const router = require("express").Router();
const AuthenticationController = require("./../controller/AuthController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API Endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête invalide
 */
router.post("/register", AuthenticationController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès de l'authentification
 *       401:
 *         description: Échec de l'authentification
 */
router.post("/login", AuthenticationController.login);

module.exports = router;
