//express
const express = require("express");
const router = express.Router();

//controller
const { index, create, find, update, destroy } = require("./controller");

//endpoint
router.get("/talents", index);
router.get("/talents/:id", find);
router.put("/talents/:id", update);
router.post("/talents", create);

router.delete("/talents/:id", destroy);

// export
module.exports = router;
