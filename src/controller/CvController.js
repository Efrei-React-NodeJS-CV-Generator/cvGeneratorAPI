const CvModel = require("../models/Cv");
const UserModel = require("../models/User");
const AvisModel = require("../models/Avis");
const { getAuthenticatedUser, isUserAdmin, isUserOwner } = require("../Security/SecurityHelper");
const { verifyCv } = require("../validator/CvValidator");

const CvController = {
    create: async (req, res) => {
        try {
            const authenticatedUser = await getAuthenticatedUser(req);

            verifyCv(req.body);

            if (!authenticatedUser) {
                return res.status(403).json({
                    message: "Vous devez être connecté(e) pour créer un CV.",
                });
            }

            if (authenticatedUser.cv) {
                return res.status(403).json({
                    message: "Vous avez déjà un CV",
                });
            }

            const cv = new CvModel({
                user: authenticatedUser._id,
                titre: req.body.titre,
                education: req.body.education,
                experience: req.body.experience,
                presentation: req.body.presentation,
                skills: req.body.skills,
                softSkills: req.body.softSkills,
                telephone: req.body.telephone,
                linkedin: req.body.linkedin,
                private: req.body.private,
                langage: req.body.langage,
            });

            const savedCv = await cv.save();
            await UserModel.findByIdAndUpdate(authenticatedUser._id, { cv: savedCv._id });

            res.status(201).send({
                user: authenticatedUser,
                titre: savedCv.titre,
                education: savedCv.education,
                experience: savedCv.experience,
                presentation: savedCv.presentation,
                skills: savedCv.skills,
                softSkills: savedCv.softSkills,
                telephone: savedCv.telephone,
                linkedin: savedCv.linkedin,
                private: savedCv.private,
                langage: savedCv.langage,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const authenticatedUser = await getAuthenticatedUser(req);
        try {
            const cv = await CvModel.findById(req.params.id).populate("user").populate("Avis");

            if (!cv) {
                return res.status(404).send({
                    message: "CV non trouvé",
                });
            }

            if (!isUserAdmin(authenticatedUser) && !isUserOwner(authenticatedUser, cv.user)) {
                return res.status(403).send({
                    message: "Vous n'êtes pas autorisé à supprimer ce CV",
                });
            }

            const user = await UserModel.findById(cv.user._id);
            await user.updateOne({ cv: null });
            await AvisModel.deleteMany({ cv: cv._id });
            await CvModel.findByIdAndDelete(cv._id);

            res.status(200).send({
                message: "CV supprimé avec succès",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const cv = req.params.id ? await CvModel.findById(req.params.id) : null;
            const authenticatedUser = await getAuthenticatedUser(req);

            if (!isUserOwner(authenticatedUser, cv.user)) {
                return res.status(403).send({
                    message: "Vous n'êtes pas autorisé à modifier les informations de ce CV",
                });
            }

            cv.titre = req.body.titre || cv.titre;
            cv.education = req.body.education || cv.education;
            cv.experience = req.body.experience || cv.experience;
            cv.presentation = req.body.presentation || cv.presentation;
            cv.skills = req.body.skills || cv.skills;
            cv.softSkills = req.body.softSkills || cv.softSkills;
            cv.telephone = req.body.telephone || cv.telephone;
            cv.linkedin = req.body.linkedin || cv.linkedin;
            cv.private = req.body.private !== undefined ? req.body.private : cv.private;
            cv.langage = req.body.langage || cv.langage;

            await cv.save();

            res.send({
                message: "CV mis à jour avec succès",
                cv: {
                    id: cv._id,
                    titre: cv.titre,
                    education: cv.education,
                    experience: cv.experience,
                    presentation: cv.presentation,
                    skills: cv.skills,
                    softSkills: cv.softSkills,
                    telephone: cv.telephone,
                    linkedin: cv.linkedin,
                    private: cv.private,
                    langage: cv.langage,
                },
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossible de mettre à jour les informations",
            });
        }
    },

    findOneCV: async (req, res) => {
        try {
            const authenticatedUser = await getAuthenticatedUser(req);
            const cv = await CvModel.findById(req.params.id)
                .populate("user")
                .populate({
                    path: "Avis",
                    populate: {
                        path: "user",
                    },
                });

            if (!cv) {
                return res.status(404).send({
                    message: "CV non trouvé",
                });
            }

            if (cv.private && !isUserOwner(authenticatedUser, cv.user) && !isUserAdmin(authenticatedUser)) {
                return res.status(403).send({
                    message: "Vous n'êtes pas autorisé à consulter ce CV",
                });
            }

            res.status(200).send({
                cv: cv,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    findAllPublicCv: async (req, res) => {
        try {
            const cvs = await CvModel.find({ private: false }).select("_id titre user").populate("user");

            if (!cvs.length) {
                return res.status(404).send({
                    message: "Aucun ID de CV trouvé",
                });
            }

            const cvDetails = cvs.map((cv) => ({
                cvId: cv._id,
                titre: cv.titre,
                user: {
                    id: cv.user._id,
                    firstname: cv.user.prenom,
                    lastname: cv.user.nom,
                },
            }));
            res.status(200).send(cvDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = CvController;
