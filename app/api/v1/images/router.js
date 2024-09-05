const express = require("express");
const router = express.Router();
// import controller
const { create, index } = require("./controller");
// middleware
const upload = require("../../../middleware/multer");

//endpoint
// string 'avatar' pada upload.single("avatar") adalah nama field yang digunakan untuk mengirimkan file (jika menggunakan postman pada body form-data berikan field dengan nama 'avatar')
router.get("/images", index);
router.post("/images", upload.single("avatar"), create);

//agar bisa digunakan pada app.js, jangan lupa untuk export router
module.exports = router;
