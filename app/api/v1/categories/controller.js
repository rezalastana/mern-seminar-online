// import Category from './model' no need model, use in services;
// const Category = require("./model");

const { StatusCodes } = require("http-status-codes");

// use service from mongoose folder categories.js file
const {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
    deleteCategories,
} = require("../../../services/mongoose/categories");

// get all
const index = async (req, res, next) => {
    try {
        const result = await getAllCategories(req);

        res.status(StatusCodes.OK).json({
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
        const result = await createCategories(req);

        //mengembalikan response
        res.status(StatusCodes.ACCEPTED).json({
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
        // const { id } = req.params;

        // gunakan fitur findOne() bawaan dari mongoose untuk mencari data berdasarkan id
        // const result = await Category.findOne({ _id: id });
        // jika menggunakan fitur findById tinggal masukkan params id nya saja
        // const result = await Category.findById(id);
        const result = await getOneCategories(req);

        // validasi custom error dengan return
        if (!result)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Id Category not found" });

        // ketika return error, maka code dibawah tidak dijalankan
        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get category by Id",
        });
    } catch (error) {
        next(error);
    }
};

// method update
const update = async (req, res, next) => {
    try {
        //find category by id
        // const { id } = req.params;
        // variable name
        // const { name } = req.body;

        // const checkingCategories = await Category.findOne({ _id: id });
        //if category not found, nanti kita gunakan service agar tidak copas setiap validasi
        // if (!checkingCategories) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
        // }

        // jika id ditemukan, maka ambil data dari request body name / diambil dari variable name diatas
        // checkingCategories.name = name;
        // save
        // await checkingCategories.save();

        //bisa juga menggunakan findByIdAndUpdate
        // const result = await Category.findByIdAndUpdate(
        //     { _id: id },
        //     { name },
        //     { new: true, runValidators: true }
        // );

        const result = await updateCategories(req);

        // kembalikan response
        res.status(StatusCodes.OK).json({
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
        const result = await deleteCategories(req);

        res.status(StatusCodes.OK).json({
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
