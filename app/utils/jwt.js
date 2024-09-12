const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config");

const createJWT = ({ payload }) => {
    // jwt sign berfungsi untuk mendaftarkan token -> payload dan secretkey
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiration,
    });
    return token;
};

const isTokenValid = ({ token }) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createJWT,
    isTokenValid,
};
