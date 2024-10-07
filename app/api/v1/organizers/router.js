const express = require("express");
const router = express.Router();

//controller
const { createCMSOrganizer, createCMSUser } = require("./controller");
//middleware
const { authenticateUser } = require("../../../middleware/auth");

//endpoint
router.post("/organizers", createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUser);

// export
module.exports = router;
