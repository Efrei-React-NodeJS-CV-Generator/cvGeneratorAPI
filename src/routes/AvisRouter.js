const router = require("express").Router();
const AvisController = require("../controller/AvisController");

/**
 * @swagger
 * tags:
 *   name: Avis
 *   description: Avis related API endpoints
 */

/**
 * @swagger
 * /api/avis/{cvId}:
 *   post:
 *     summary: Ajout d'un Avis
 *     tags: [Avis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               user:
 *                 type: User
 *               cv:
 *                 type: Cv
 *     responses:
 *       201:
 *         description: Avis ajoutée avec succès
 *       400:
 *         description: Requête invalide
 */
router.post("/:id", AvisController.create);

module.exports = router;
