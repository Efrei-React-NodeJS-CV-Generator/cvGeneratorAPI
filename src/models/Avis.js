const mongoose = require("mongoose");

const AvisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cv",
        default: null,
    },

    comment: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.models.Avis || mongoose.model("Avis", AvisSchema);
