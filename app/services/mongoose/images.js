// model
const Images = require("../../api/v1/images/model");

// cara lain ketika membuat imageUrl
const generateImgUrl = async (req) => {
    const result = `uploads/${req.file.filename}`;

    return result;
};
// kita akan menggunakan cara ini
const createImages = async (req) => {
    const result = await Images.create({
        // ternary condition
        name: req.file
            ? `uploads/${req.file.filename}` // jika file ada maka gunakan ini untuk upload images
            : `uploads/avatar/default.jpeg`, // jika file tidak ada gunakan default image
    });
    return result;
};

module.exports = {
    generateImgUrl,
    createImages,
};
