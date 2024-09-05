// model
const Images = require("../../api/v1/images/model");
// error
const { NotFoundError } = require("../../errors");

// getAll Images
const getAllImages = async () => {
    const result = await Images.find();

    return result;
};
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

// checking image
// checking image ini digunakan pada Talents untuk mengecek apakah image yang diinputkan ada atau tidak
const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);

    // jika tidak ada image
    if (!result) throw new NotFoundError(`Tidak ada gambar dengan id : ${id}`);

    return result;
};

module.exports = {
    getAllImages,
    generateImgUrl,
    createImages,
    checkingImage,
};
