// service untuk membuat akun amdin, dan yang bisa membuat hanyalah organizers
const User = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

// sigin
const signIn = async (req, res, next) => {
    // req from body
    const { email, password } = req.body;

    // kondisi jika email dan password tidak diisi
    if (!email || !password)
        throw new BadRequestError("Email dan Password harus diisi");

    // cari user dengan email
    const result = await User.findOne({ email });
    //jika user tidak ditemukan / unAuthorized
    if (!result) throw new UnauthorizedError("Invalid Credentials");

    // check password dengan compare yang telah dibuat pada model users
    const passwordValid = await result.comparePassword(password);
    // jika password tidak valid
    if (!passwordValid) throw new UnauthorizedError("Invalid Credentials");

    //jika benar buat JWT token
    //createTokenUser berisi user dengan nama, email, role, dan id yang akan menjadi data pada token yang di generate
    const token = createJWT({ payload: createTokenUser(result) });
    return token;
};

module.exports = {
    signIn,
};
