// Desc: Mongoose service for categories

const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

// get all categories
const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
};

//create categories, menerima sebuah request
const createCategories = async (req) => {
    const { name } = req.body;

    // checking categories pernah dibuat atau belum
    const check = await Categories.findOne({ name });
    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check) throw new BadRequestError("Nama Kategori sudah ada / duplikat");

    // jika false / tidak ada nama yang sama, return to create
    const result = await Categories.create({ name });

    return result;
};

// export all modules methods
module.exports = {
    getAllCategories,
    createCategories,
};
