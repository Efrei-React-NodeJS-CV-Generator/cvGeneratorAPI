const { Validator } = require("jsonschema");
const Role = require("../roles/RolesEnum");

module.exports = {
    verifyUser: (user) => {
        if (!user) {
            throw new Error("User Information not provided");
        }
        let validator = new Validator();
        let userSchema = {
            type: "object",
            properties: {
                prenom: {
                    type: "string",
                    minLength: 2,
                    errorMessage: "Prenom est incorrect",
                },
                nom: {
                    type: "string",
                    minLength: 2,
                    errorMessage: "Nom est incorrect",
                },
                email: {
                    type: "string",
                    format: "email",
                    errorMessage: "l'email est incorrect",
                },
                password: {
                    type: "String",
                    minLength: 6,
                    errorMessage: "Le mot de passe doit contenir minimun 6 caractère avoir un chiffre et une majuscule",
                    pattern: "^(?=.*[A-Z])(?=.*[0-9]).+$", // regex : minimun 1 chiffre et une majuscule                    
                },
                role: {
                    type: "string",
                    enum: [Role.ADMIN, Role.USER],
                    errorMessage: "Role est incorrect",
                },
            },
            required: ["prenom", "nom", "email", "password"],
        };

        let result = validator.validate(user, userSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(" ");

            throw new Error(errorInputsMsg);
        }
    },
};
