const Product = require("../models/Product");

module.exports = {
  viewProduct: async (req, res) => {
    try {
      const product = await Product.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("index", {
        product,
        alert,
        title: "KaimonoRen", // Untuk title dari aplikasi kita
      });
    } catch (error) {
      res.redirect("/product");
    }
  },

  // Membuat create data untuk product
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addProduct: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { nama, bahan, warna, deskripsi, harga } = req.body;
      const fotoPath = req.file.filename;

      // Membuat objek Product dengan fotoPath yang diperoleh
      const newProduct = new Product({
        nama,
        bahan,
        warna,
        deskripsi,
        foto: fotoPath, // Menyimpan nama file (path gambar) ke dalam database
        harga,
      });

      // Simpan objek Product ke database
      await newProduct.save();

      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Produk");
      req.flash("alertStatus", "success");
      res.redirect("/product"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/product");
    }
  },

  // Membuat update data untuk product
  editProduct: async (req, res) => {
    try {
      const { id, nama, bahan, warna, deskripsi, foto, harga } = req.body;
      const product = await Product.findOne({ _id: id });
      product.nama = nama;
      product.bahan = bahan;
      product.warna = warna;
      product.deskripsi = deskripsi;
      product.harga = harga;

      // Periksa apakah ada file gambar yang diunggah
      if (req.file) {
        const newFoto = req.file.filename;
        product.foto = newFoto; // Update foto produk dengan foto baru
      }
      
      // Menyimpan datanya ke database
      await product.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data produk");
      req.flash("alertStatus", "success");
      res.redirect("/product");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
      res.redirect("/product");
    }
  },

  // Membuat delete data untuk product
  deleteProduct: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await product.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data product");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/product");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/product");
    }
  },
// Membuat view detail produk takumi
viewDetailProduct: async (req, res) => {
  try {
    // Mendapatkan ID produk dari parameter URL
    const { id } = req.params;
    // Mencari produk berdasarkan ID
    const product = await Product.findById(id);
    
    // Memeriksa apakah produk ditemukan
    if (!product) {
      // Jika tidak ditemukan, kirimkan respon dengan status 404
      return res.status(404).send('Produk tidak ditemukan');
    }

    // Jika produk ditemukan, render view detail_produk dan kirimkan data produk
    res.render('detail_produk', { product });
  } catch (error) {
    // Jika terjadi kesalahan, kirimkan respon dengan status 500 dan pesan error
    res.status(500).send('Terjadi kesalahan saat memuat detail produk');
  }
},};