// dotenv agar bisa membaca file .env
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    // ambil dari env
    urlDb: process.env.URL_MONGODB_DEV,
};
