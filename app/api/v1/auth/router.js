const express = require("express");
const router = express.Router();

//controller
const { signinCms } = require("./controller");

//endpoint
router.post("/auth/signin", signinCms);

// export
module.exports = router;
