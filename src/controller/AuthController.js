const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");
const { verifyUser } = require("../validator/UserValidator");
const Role = require("../roles/RolesEnum");

module.exports = {
    register: async (req, res) => {
        try {
            verifyUser(req.body);
            const { prenom, nom, email, password, role } = req.body;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send({
                    message: "Cette adresse email est déja utilisée",
                });
            }

            const hash = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                prenom,
                nom,
                email,
                password: hash,
                role: role || Role.USER,
            });

            await newUser.save();
            res.status(201).send({
                id: newUser._id,
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                role: newUser.role,
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Erreur lors de l'inscription impossibe d'enregistrer l'utilisateur",
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).send({
                message: "L'utilisateur n'existe pas",
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).send({
                message: "Le mot de passe est incorrect",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.send({
            message: "Connexion réussie",
            user: {
                id: user.id,
                email: user.email,
                prenom: user.prenom,
                nom: user.nom,
                role: user.role,
                token,
            },
        });
    },
};
