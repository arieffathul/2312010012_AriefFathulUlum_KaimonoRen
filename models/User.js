const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    nama: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userScheme);