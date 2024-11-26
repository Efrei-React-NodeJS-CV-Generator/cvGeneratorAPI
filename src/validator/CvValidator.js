const { Validator } = require("jsonschema");

module.exports = {
    verifyCv: (cv) => {
        if (!cv) {
            throw new Error("Informations du CV non fournie");
        }
        let validator = new Validator();
        let cvSchema = {
            type: "object",
            properties: {
                titre: {
                    type: "string",
                    minLength: 1,
                    errorMessage: "Titre requis",
                },
                education: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            school: { type: "string" },
                            formation: { type: "string" },
                            description: { type: "string" },
                            startDate: { type: "number" },
                            endDate: { type: "number" },
                        },
                    },
                },
                experience: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            compagny: { type: "string" },
                            position: { type: "string" },
                            startDate: { type: "number" },
                            endDate: { type: "number" },
                        },
                    },
                },
                presentation: {
                    type: "string",
                    minLength: 1,
                    errorMessage: "presentation requise",
                },
                skills: {
                    type: "array",
                    items: { type: "string" },
                },
                softSkills: {
                    type: "array",
                    items: { type: "string" },
                },
                telephone: {
                    type: "string",
                    errorMessage: "numéro de telephone requis",
                },
                linkedin: {
                    type: "string",
                    format: "uri",
                    errorMessage: "l'URL LinkedIn est invalid",
                },
                prive: {
                    type: "boolean",
                },

                langage: {
                    type: "array",
                    items: { type: "string" },
                },
            },
            required: ["titre", "presentation", "telephone", "linkedin", "skills", "softSkills", "langage"],
        };

        let result = validator.validate(cv, cvSchema);

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
