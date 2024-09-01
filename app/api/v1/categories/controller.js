// import Category from './model';
const Category = require("./model");

// get all
const index = async (req, res, next) => {
    try {
        // gunakan fitur .find() bawaan dari mongoose untuk mengambil semua data
        // bisa gunakan fitur .select() untuk memilih field yang ingin ditampilkan
        // const result = await Category.find().select("_id name");
        const result = await Category.find();

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
            data: result,
            message: "Success create category",
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
        // jika menggunakan fitur findById tinggal masukkan params id nya saja
        // const result = await Category.findById(id);

        // validasi custom error dengan return
        if (!result)
            return res.status(404).json({ message: "Id Category not found" });

        // ketika return error, maka code dibawah tidak dijalankan
        res.status(200).json({
            data: result,
            message: "Get category by id",
        });
    } catch (error) {
        next(error);
    }
};

// method update
const update = async (req, res, next) => {
    try {
        //find category by id
        const { id } = req.params;
        // variable name
        const { name } = req.body;

        // const checkingCategories = await Category.findOne({ _id: id });
        //if category not found, nanti kita gunakan service agar tidak copas setiap validasi
        // if (!checkingCategories) {
        //     return res.status(404).json({ message: "Category not found" });
        // }

        // jika id ditemukan, maka ambil data dari request body name / diambil dari variable name diatas
        // checkingCategories.name = name;
        // save
        // await checkingCategories.save();

        //bisa juga menggunakan findByIdAndUpdate
        const result = await Category.findByIdAndUpdate(
            { _id: id },
            { name },
            { new: true, runValidators: true }
        );

        // kembalikan response
        res.status(200).json({
            data: result,
            message: "Success update category",
        });
    } catch (error) {
        next(error);
    }
};

// method delete
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Category.findByIdAndDelete({ _id: id });

        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            data: result,
            message: "Success delete category",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    find,
    create,
    update,
    destroy,
};
