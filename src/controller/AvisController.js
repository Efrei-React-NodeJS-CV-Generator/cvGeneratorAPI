const AvisModel = require("../models/Avis");
const CvModel = require("../models/Cv");
const UserModel = require("../models/User");
const { getAuthenticatedUser } = require("../Security/SecurityHelper");

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
};
