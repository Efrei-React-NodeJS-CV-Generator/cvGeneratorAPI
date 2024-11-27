const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    Avis: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Avis",
        },
    ],

    titre: {
        type: String,
        required: true,
    },

    education: [
        {
            school: String,
            formation: String,
            level: String,
            description: String,
            startDate: Number,
            endDate: Number,
        },
    ],

    experience: [
        {
            compagny: String,
            position: String,
            startDate: Number,
            endDate: Number,
        },
    ],

    presentation: {
        type: String,
        required: true,
    },

    skills: [String],

    softSkills: [String],

    telephone: {
        type: String,
        required: true,
    },

    linkedin: {
        type: String,
        required: true,
    },

    private: {
        type: Boolean,
        default: true,
    },

    langage: [String],
});

module.exports = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
