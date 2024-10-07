const express = require("express");
const router = express.Router();
// import controller
const { index, create, find, update, destroy } = require("./controller");

// auth middleware
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");
const app = require("../../../../app");

// middleware, bisa seperti ini atau dimasukkan 1 1 dalam router
// app.use(authenticateUser);

//endpoint, atau bisa langsung dimasukkan dalam router
//sehingga yang dapat mengakses kategori hanyalah user yang sudah login dengan roles organizer
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    find
);
router.put(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    update
);

router.post(
    "/categories",
    authenticateUser,
    authorizeRoles("organizer"),
    create
);

router.delete(
    "/categories/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    destroy
);

//agar bisa digunakan pada app.js, jangan lupa untuk export router
module.exports = router;
