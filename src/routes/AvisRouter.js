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

/**
 * @swagger
 * /api/avis/{id}:
 *   patch:
 *     summary: Mise à jour d'un Avis
 *     tags: [Avis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avis mis à jour avec succès
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Avis introuvable
 *       403:
 *         description: Non autorisé
 */
router.patch("/:id", AvisController.update);

/**
 * @swagger
 * /api/avis/{id}:
 *   delete:
 *     summary: Suppression d'un Avis
 *     tags: [Avis]
 *     responses:
 *       200:
 *         description: Avis supprimé avec succès
 *       404:
 *         description: Avis introuvable
 *       403:
 *         description: Non autorisé
 */
router.delete("/:id", AvisController.delete);

module.exports = router;
