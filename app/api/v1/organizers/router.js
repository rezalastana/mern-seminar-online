const express = require("express");
const router = express.Router();

//controller
const { createCMSOrganizer, createCMSUser } = require("./controller");
//middleware
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");

//endpoint
// yang bisa membuat organizers hanyalah owner
router.post(
    "/organizers",
    authenticateUser,
    authorizeRoles("owner"),
    createCMSOrganizer
);
router.post(
    "/users",
    authenticateUser,
    authorizeRoles("organizer"),
    createCMSUser
);

// export
module.exports = router;
