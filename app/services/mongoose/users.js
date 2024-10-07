const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

// method create Organizer and Users, diletakkan di organizer/controller.js
const createOrganizer = async (req) => {
    const { organizer } = req.body;
    const { name, email, role, password, confirmPassword } = req.body;

    //kondisi jika password dan confirm password tidak sama
    if (password !== confirmPassword)
        throw new BadRequestError(
            "Password dan Konfirmasi Password tidak sama"
        );
    // jika password sama lanjut ke proses selanjutnya

    // create organizer and user
    // fungsi await adalah fungsi yang digunakan untuk menunggu proses async selesai
    // create Organizers terlebih dahulu
    const result = await Organizers.create({ organizer });

    // jalankan await diatas, jika sudah selesai, maka lanjut ke proses selanjutnya
    // selanjutnya create Users
    const users = await Users.create({
        name,
        email,
        password,
        role,
        // simpan id dari organizer yang telah dibuat
        organizer: result._id,
    });

    // hapus password dari response, agar user baru tidak mendapatkan password dari sebelumnya
    delete users._doc.password;

    return users;
};

// method createUser
const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError(
            "Password dan Konfirmasi Password tidak sama"
        );
    }

    const result = await Users.create({
        name,
        email,
        password,
        role,
        organizer: req.user.organizer,
    });

    return result;
};

module.exports = {
    createOrganizer,
    createUser,
};
