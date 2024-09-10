const express = require("express");
const router = express.Router();

//controller
const { createCMSOrganizer } = require("./controller");

//endpoint
router.post("/organizers", createCMSOrganizer);

// export
module.exports = router;
