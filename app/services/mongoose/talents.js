// model
const Talents = require("../../api/v1/talents/model");
// image checking
const { checkingImage } = require("./images");
// error
const { BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
    // ambil data dari query berupa keyword
    const { keyword } = req.query;

    //  variable condition untuk meyimpan obj pencarian
    let condition = {};

    //kondisi jika keyword dimasukkan dan disimpan di condition, gunakan regex untuk mencari data dengan option i diubah menjadi huruf kecil
    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    }

    // result dengan condition yang sudah diisi
    // gunakan populet untuk mengambil data dari image dengan mengambil id dan name saja (tidak perlu semua data)
    // dan select data dari Talents hanya _id, name, role, image
    const result = await Talents.find(condition)
        .populate({
            path: "image",
            select: "_id name",
        })
        .select("_id name role image");

    return result;
};

const createTalents = async (req) => {
    // dalam body inputkan data Talents berupa name, role, image
    const { name, role, image } = req.body;

    // cari image dari field image
    // jika tidak ada maka akan muncul error ('tidak ada gambar dengan id : ${id}') // sesuai pada images checkingImage
    await checkingImage(image);

    // cari talents dengan field name, agar tidak ada nama yang sama
    const check = await Talents.findOne({ name });

    // apabila nama sudah ada maka akan muncul error
    if (check) throw new BadRequestError(`Pembicara ${name} already exists`);

    // jika tidak ada duplicat. create
    const result = await Talents.create({
        name,
        role,
        image,
    });

    return result;
};

const getOneTalents = async (req) => {
    const { id } = req.params;

    // cari talents dengan id, dengan menampilkan imagenya juga
    const result = await Talents.findOne(id)
        .populate({
            path: "image",
            select: "_id name",
        })
        .select("_id name role image");

    // jika tidak ada data dengan id yang dicari
    if (!result)
        throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`);

    return result;
};

const updateTalents = async (req) => {
    const { id } = req.params; //ambil id
    const { name, role, image } = req.body; //ambil data dari body

    //checking image
    await checkingImage(image);

    //cari talents dengan field name dan id selain dari yang dikirim dari params (pengecekan duplikasi)
    const check = await Talents.findOn;
    e({ name, _id: { $ne: id } });

    // apabilan di chek true, maka tampilkan error duplikasi
    if (check) throw new BadRequestError(`Pembicara ${name} already exists`);

    // update data dengan id yang dicari
    const result = await Talents.findOneAndUpdate(
        {
            _id: id,
        },
        {
            name,
            role,
            image,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    // jika tidak ada data dengan id yang dicari
    if (!result)
        throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`);

    return result;
};

const deleteTalents = async (req) => {
    const { id } = req.params;

    //hapus data dengan id yang dicari
    const result = await Talents.findOneAndDelete({ _id: id });

    //jika tidak ada
    if (!result)
        throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`);

    return result;
};

const checkingTalents = async (id) => {
    const result = await Talents.findOne({ _id: id });

    if (!result)
        throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`);

    return result;
};

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents,
};
