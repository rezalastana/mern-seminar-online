// import Category from './model';
const Category = require("./model");

// get all
const index = async (req, res, next) => {
    try {
        // gunakan fitur .find() bawaan dari mongoose untuk mengambil semua data
        // bisa gunakan fitur .select() untuk memilih field yang ingin ditampilkan
        const result = await Category.find().select("_id name");

        res.status(200).json({
            data: result,
            message: "Get all categories",
        });
    } catch (error) {
        next(error);
    }
};

// create
// penggunaan next untuk handle error
const create = async (req, res, next) => {
    try {
        // ambil data dari request body
        const { name } = req.body;

        const result = await Category.create({ name });

        //mengembalikan response
        res.status(200).json({
            message: "Success create category",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// method find by id
const find = async (req, res, next) => {
    try {
        //ambil id dari params
        // id disesuaikan dengan yang ada di router, misal namanya :cateogryID maka ditulis {categoryID}
        const { id } = req.params;

        // gunakan fitur findOne() bawaan dari mongoose untuk mencari data berdasarkan id
        const result = await Category.findOne({ _id: id });

        res.status(200).json({
            data: result,
            message: "Get category by id",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    find,
    create,
};
