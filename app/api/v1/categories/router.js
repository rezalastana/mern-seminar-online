const express = require("express");
const router = express.Router();
// import controller
const { index, create, find } = require("./controller");

//endpoint
router.get("/categories", index);
router.get("/categories/:id", find);

router.post("/categories", create);

//agar bisa digunakan pada app.js, jangan lupa untuk export router
module.exports = router;
