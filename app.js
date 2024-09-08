const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// import router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");

//variable v1
const v1 = "/api/v1/cms";

// custom error handler
const notFoundMiddleware = require("./app/middleware/not-found");
const handleErrorMiddleware = require("./app/middleware/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/users", usersRouter); => localhost:9000/
// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "Welcome to API semina",
//     });
// });
// router
app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);

// use middleware error
// pastikan use middleware dibawah router, agar router dijalankan terlebih dahulu
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
