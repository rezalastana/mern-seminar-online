const multer = require("multer");

const storage = multer.diskStorage({
    // tentukan lokasi penyimpanan file
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    // tentukan penamaan file
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
        // terserah ingin penamaan seperti, bisa juga dengan random Math
        // cb(null,Math.floor(Math.random() * 99999999) + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // file harus bertipe
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        // reject file
        cb(new Error("Unsuported file format"), false);
    }
};

const uploadMiddleware = multer({
    // letak penyimpanan file
    storage,
    // batas ukuran file
    limits: {
        fileSize: 1024 * 1024 * 3, // 3MB
    },
    // filter file
    fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
