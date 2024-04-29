const mongoose = require("mongoose");

// Membuat variabel baru dengan nama productScheme
const productScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  bahan: {
    type: String,
    required: true,
  },
  warna: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
});

// lalu mengekspor model dari product, tujuan mengekspor ini supaya model dari product ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Product", productScheme);
