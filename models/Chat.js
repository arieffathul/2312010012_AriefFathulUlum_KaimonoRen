const mongoose = require("mongoose");

const chatScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Menunjukkan bahwa ini adalah ObjectId
        ref: 'User', // Nama model yang direferensikan (harus sesuai dengan model user)
        required: true,
    },
    isi: {
        type: String, // Menggunakan String untuk menyimpan isi pesan
        required: true,
    },
    time: {
        type: Date, // Tipe data Date untuk menyimpan waktu pesan
        required: true,
    },
});


// lalu mengekspor model dari product, tujuan mengekspor ini supaya model dari product ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Chat", chatScheme);