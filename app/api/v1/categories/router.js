const express = require("express");
const router = express.Router();
// import controller
const { index, create, find, update, destroy } = require("./controller");

//endpoint
router.get("/categories", index);
router.get("/categories/:id", find);
router.put("/categories/:id", update);

router.post("/categories", create);

router.delete("/categories/:id", destroy);

//agar bisa digunakan pada app.js, jangan lupa untuk export router
module.exports = router;
