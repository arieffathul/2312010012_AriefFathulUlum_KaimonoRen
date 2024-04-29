const mongoose = require("mongoose");

const ulasanScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Menunjukkan bahwa ini adalah ObjectId
        ref: 'User',
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, // Menunjukkan bahwa ini adalah ObjectId
        ref: 'Product', // Nama model yang direferensikan (harus sesuai dengan model user)
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    ulasan: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Ulasan", ulasanScheme);