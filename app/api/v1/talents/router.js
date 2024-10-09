//express
const express = require("express");
const router = express.Router();

//controller
const { index, create, find, update, destroy } = require("./controller");

//middleware
const {
    authenticateUser,
    authorizeRoles,
} = require("../../../middleware/auth");

//endpoint
router.get("/talents", authenticateUser, authorizeRoles("organizer"), index);
router.get("/talents/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put(
    "/talents/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    update
);
router.post("/talents", authenticateUser, authorizeRoles("organizer"), create);

router.delete(
    "/talents/:id",
    authenticateUser,
    authorizeRoles("organizer"),
    destroy
);

// export
module.exports = router;
