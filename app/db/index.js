// import mongoose
const mongoose = require("mongoose");

// import konfigurasi database mongose
const { urlDb } = require("../config");

// connect to mongoose
mongoose.connect(urlDb);

// simpan koneksi ke variabel db
const db = mongoose.connection;

//export db
module.exports = db;
