const AvisModel = require("../models/Avis");
const CvModel = require("../models/Cv");
const UserModel = require("../models/User");
const { getAuthenticatedUser, isUserAdmin, isUserOwner } = require("../Security/SecurityHelper");

module.exports = {
    create: async (req, res) => {
        try {
            const authenticatedUser = await getAuthenticatedUser(req);
            const cv = await CvModel.findById(req.params.id);

            if (!authenticatedUser) {
                return res.status(403).json({
                    message: "Vous devez être connecté(e) pour écrire un commentaire",
                });
            }

            const fetchedUser = await UserModel.findById(authenticatedUser._id);
            const Avis = new AvisModel({
                user: fetchedUser._id,
                cv: cv._id,
                comment: req.body.comment,
            });

            const savedAvis = await Avis.save();
            cv.Avis.push(savedAvis._id);
            await cv.save();

            res.status(201).send({
                user: fetchedUser,
                cv: Avis.cv,
                comment: savedAvis.comment,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const authenticatedUser = await getAuthenticatedUser(req);
            const { comment } = req.body;
            const avis = await AvisModel.findById(req.params.id);

            if (!avis) {
                return res.status(404).json({ message: "Avis introuvable" });
            }

            if (avis.user.toString() !== authenticatedUser._id.toString()) {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cet avis" });
            }

            avis.comment = comment;
            const updatedAvis = await avis.save();

            res.status(200).json({
                message: "Avis mis à jour",
                avis: updatedAvis,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Méthode pour supprimer un avis
    delete: async (req, res) => {
        try {
            const authenticatedUser = await getAuthenticatedUser(req);
            const avis = await AvisModel.findById(req.params.id);

            if (!avis) {
                return res.status(404).json({ message: "Avis introuvable" });
            }

            if (!isUserOwner(authenticatedUser, avis.user) && !isUserAdmin(authenticatedUser)) {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cet avis" });
            }

            await AvisModel.findByIdAndDelete(req.params.id);

            res.status(200).json({
                message: "Avis supprimé",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("catch");
        }
    },
};
