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

    title: {
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

    biography: {
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

    language: [String],
});

module.exports = mongoose.models.Cv || mongoose.model("Cv", CvSchema);
