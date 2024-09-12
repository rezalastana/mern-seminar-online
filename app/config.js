// dotenv agar bisa membaca file .env
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    // ambil dari env
    urlDb: process.env.URL_MONGODB_DEV,
    // jwt
    jwtExpiration: "24h", //expired token in 24 hour
    jwtSecret: process.env.JWT_SECRET,
};
