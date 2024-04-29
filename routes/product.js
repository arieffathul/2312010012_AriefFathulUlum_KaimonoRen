
// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const productController = require("../controllers/productController");

// endpoint
router.get("/", productController.viewProduct); // Untuk view
router.post("/", productController.addProduct); // Untuk add
router.put("/", productController.editProduct); // Untuk edit
router.delete("/:id", productController.deleteProduct);//untuk delete
router.get('/:id', productController.viewDetailProduct); // untuk menampilkan detail produk

// Lalu export routernya
module.exports = router;