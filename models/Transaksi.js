const mongoose = require("mongoose");

const transaksiScheme = new mongoose.Schema({
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
    tanggal_transaksi: {
        type: Date,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    bukti_bayar: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Transaksi", transaksiScheme);