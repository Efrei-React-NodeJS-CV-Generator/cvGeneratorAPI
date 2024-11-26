const router = require("express").Router();
const UserController = require("./../controller/UserController");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related API endpoints
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Récupérer ses informations
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       201:
 *         description: affichage des informations de l'utilisateur
 *       400:
 *         description: Requête invalide
 */
router.get("/:id", UserController.show);

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Modifier ses informations
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *               nom:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Informations modifés
 *       400:
 *         description: Requête invalide
 */
router.patch("/:id", UserController.edit);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       401:
 *         description: Échec de la suppression (authentification requise)
 *       404:
 *         description: Utilisateur introuvable
 */
router.delete("/:id", UserController.delete);

module.exports = router;
