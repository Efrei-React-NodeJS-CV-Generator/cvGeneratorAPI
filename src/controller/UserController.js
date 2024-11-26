const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");
const { getAuthenticatedUser, isUserOwner, isUserAdmin } = require("../Security/SecurityHelper");

module.exports = {
    show: async (req, res) => {
        try {
            const user = req.params.id
                ? await UserModel.findById(req.params.id).populate({
                      path: "cv",
                      populate: [
                          {
                            path: "user"
                          },
                          {
                              path: "review",
                              populate: {
                                  path: "user",
                              },
                          },
                      ],
                  })
                : null;
            const authenticatedUser = await getAuthenticatedUser(req);            

            if (!isUserOwner(authenticatedUser, user)) {
                return res.status(403).send({
                    message: "Vous n'avez pas les droits suffisants pour voir les informations des utilisateurs.",
                });
            }

            res.send({
                prenom: user.prenom,
                nom: user.nom,
                email: user.email,
                cv: user.cv,
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Erreur 500 : Impossible de récupérer les informations de l'utilisateur",
            });
        }
    },

    edit: async (req, res) => {
        try {
            const user = req.params.id ? await UserModel.findById(req.params.id) : null;
            const authenticatedUser = await getAuthenticatedUser(req);

            if (!isUserOwner(authenticatedUser, user)) {
                return res.status(403).send({
                    message: "Vous n'avez pas les droits suffisants pour changer les informations de cet utilisateur.",
                });
            }

            user.prenom = req.body.prenom || user.prenom;
            user.nom = req.body.nom || user.nom;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            user.role = req.body.role || user.role;

            await user.save();

            res.send({
                message: "Informations mis à jour avec succès",
                user: {
                    id: user._id,
                    prenom: user.prenom,
                    nom: user.nom,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossible de mettre à jour les informations",
            });
        }
    },

    delete: async (req, res) => {
        const authenticatedUser = await getAuthenticatedUser(req);

        if (!isUserAdmin(authenticatedUser)) {
            return res.status(403).send({
                message: "Vous n'avez pas les droits suffisants pour supprimer un utilisateur",
            });
        }

        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send({
                    message: "Utilisateur introuvable.",
                });
            }
            res.send({
                message: "Utilisateur supprimé.",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Impossible de supprimer l'utilisateur",
            });
        }
    },
};
