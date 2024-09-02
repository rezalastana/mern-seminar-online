const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// import router categories
const categoriesRouter = require("./app/api/v1/categories/router");

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
// use middleware error
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

// app.use("/users", usersRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to API semina",
    });
});
// router categories
app.use(v1, categoriesRouter);

module.exports = app;
