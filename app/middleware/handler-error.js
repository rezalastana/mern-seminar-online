const { StatusCodes } = require("http-status-codes");

// method error handler
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("err");
    console.log(err.message);

    let customError = {
        // set default error, jika nantinta error tidak tau darimana set error ini sebagai default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };

    //error validasi mongoose, misal ada required field, maxlength, minlength dari mongoose
    if (err.name === "ValidationError") {
        // bisa dilihat dengan console.log(err.errors) akan ditampilkan obj makanya digunakan Object.values dan map lalu join
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
        customError.statusCode = 400;
    }

    // if duplicate key
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

// export
module.exports = errorHandlerMiddleware;
