const mongoose = require("mongoose");

const favoritScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Menunjukkan bahwa ini adalah ObjectId
        ref: 'User', // Nama model yang direferensikan (harus sesuai dengan model user)
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, // Menunjukkan bahwa ini adalah ObjectId
        ref: 'Product', // Nama model yang direferensikan (harus sesuai dengan model user)
        required: true,
    },
});

module.exports = mongoose.model("Favorit", favoritScheme);