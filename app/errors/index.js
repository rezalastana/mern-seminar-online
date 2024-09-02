// panggil semua error handler
const CustomAPIError = require("./custom-api-error");
const BadRequestError = require("./bad-request");
const NotFound = require("./not-found");

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFound,
};
