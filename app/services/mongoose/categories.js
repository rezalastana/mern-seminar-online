// Desc: Mongoose service for categories
const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

// get all categories
const getAllCategories = async (req) => {
    // ambil nilai req.user.organizer untuk mendapatkan semua data yang dibuat oleh organizer
    // karena hanya organizer yang dapat membuat kategori
    const result = await Categories.find({ organizer: req.user.organizer });

    return result;
};

//create categories, menerima sebuah request
const createCategories = async (req) => {
    const { name } = req.body;

    // checking categories pernah dibuat atau belum
    // masukkan organizer, sehingga akan dicek apakah data yang dibuat oleh organizer berbeda sudah ada atau belum tidak bertabrakan
    const check = await Categories.findOne({
        name,
        organizer: req.user.organizer,
    });
    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check) throw new BadRequestError("Nama Kategori sudah ada / duplikat");

    // jika false / tidak ada nama yang sama, return to create
    // masukkan organizer untuk mendapatkan semua data yang dibuat oleh organizer ketika create
    const result = await Categories.create({
        name,
        organizer: req.user.organizer,
    });

    return result;
};

//get One categories
const getOneCategories = async (req) => {
    // ambil id dari params request
    const { id } = req.params;

    // jalankan await, harus dijalankan karena kita menggunakan async
    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    // check akan dilakukan jika await sudah dijalankan dan result tidak ada maka akan tampilkan error not found
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

    return result;
};

// update categories
const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // cari categories dengan id dan name selain dari yang dikirim dari params
    // menggunakan $ne (not equal) agar data yang diupdate tidak sama dengan data yang sudah ada
    // misal id 1 akan diubah namanya menjadi "Programming" namun data  categories "Programming" sudah ada, ini tidak boleh, dan dilanjutkan ke throw error
    const check = await Categories.findOne({
        name,
        organizer: req.user.organizer,
        _id: { $ne: id },
    });

    // jika data categories sudah ada maka tampilkan error bad request
    if (check) throw new BadRequestError("Nama Kategori sudah ada / duplikat");

    // jika tidak ada yang duplikat, update data
    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true }
    );

    // jika data tidak ditemukan, tampilkan error not found
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

    return result;
};

// delete categories
const deleteCategories = async (req) => {
    const { id } = req.params;

    // check
    const result = await Categories.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer,
    });

    // jika data tidak ditemukan, tampilkan error not found
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

    // jika data ditemukan, hapus data
    // await result.deleteOne();

    return result;
};

// checking categories
const checkingCategories = async (id) => {
    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });
    // console.log(result);
    if (!result)
        throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

    return result;
};

// export all modules methods
module.exports = {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
    deleteCategories,
    checkingCategories,
};
