//express
const express = require("express");
const router = express.Router();

//controller
const { index, create, find, update, destroy } = require("./controller");

//endpoint
router.get("/events", index);
router.get("/events/:id", find);
router.put("/events/:id", update);
router.post("/events", create);

router.delete("/events/:id", destroy);

// export
module.exports = router;
