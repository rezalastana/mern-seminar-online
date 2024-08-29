const express = require("express");
const router = express.Router();

//endpoint
router.get("/categories", (req, res) => {
    res.status(200).json({
        message: "Halaman Categories",
    });
});

//agar bisa digunakan pada app.js, jangan lupa untuk export router
module.exports = router;
