const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

let userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Nama harus diisi"],
            minlength: [3, "Panjang nama minimal 3 karakter"],
            maxlength: [255, "Panjang nama maksimal 255 karakter"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email harus diisi"],
        },
        password: {
            type: String,
            required: [true, "Password harus diisi"],
            minlength: [6, "Panjang password minimal 6 karakter"],
        },
        role: {
            type: String,
            enum: ["admin", "organizer", "owner"],
            default: "admin",
        },
        // relasi dengan organizer
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "Organizer",
            required: true,
        },
    },
    { timestamps: true }
);

//method untuk hashing password
// .pre adalah hooks dari mongo, sebelum password disimpan ke database, maka password akan di hash terlebih dahulu
userSchema.pre("save", async function (next) {
    const User = this;
    // bagian ini akan untuk menghash password
    if (User.isModified("password")) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

// compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    // compare password candidate dengan password di database
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = model("User", userSchema);
