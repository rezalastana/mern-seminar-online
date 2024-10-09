//express
const express = require("express");
const router = express.Router();

//controller
const { index, create, find, update, destroy } = require("./controller");

// auth middleware
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");

// endpoint
// sehingga yang dapat melakukan CRUD pada events hanya user yang memiliki role organizer
router.get("/events", authenticateUser, authorizeRoles("organizer"), index);
router.get("/events/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put(
    "/events/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    update
);
router.post("/events", authenticateUser, authorizeRoles("organizer"), create);

router.delete(
    "/events/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    destroy
);

// export
module.exports = router;
