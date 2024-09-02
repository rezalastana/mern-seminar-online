const { StatusCode } = require("http-status-codes");

// function
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default error, jika nantinta error tidak tau darimana set error ini sebagai default
        statusCode: err.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, please try again",
    };

    //error validasi mongoose, misal ada required field, maxlength, minlength dari mongoose
    if (err.name === "ValidationError") {
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

    return res
        .status(customError.statusCode)
        .json({ message: customError.msg });
};

// export
module.exports = errorHandlerMiddleware;
