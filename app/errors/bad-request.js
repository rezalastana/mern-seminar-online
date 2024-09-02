// import https-status-codes
const { StatusCode } = require("http-status-codes");
// import customAPIError
const CustomAPIError = require("./custom-api-error");

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        // memberikan statusCode bad request
        this.statusCode = StatusCode.BAD_REQUEST;
    }
}

module.exports = BadRequest;
