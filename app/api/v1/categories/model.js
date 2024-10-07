const mongoose = require("mongoose");
const { model, Schema } = mongoose;
// const moment = require("moment-timezone");

//schema
let categorySchema = Schema(
    {
        // id akan tergenerate secara otomatis
        name: {
            type: String,
            // bisa diberika array untuk custom validasi
            minLength: [3, "Panjang nama kategori minimal 3 karakter"],
            maxLength: [20, "Panjang nama kategori maksimal 20 karakter"],
            required: [true, "Nama kategori harus diisi"],
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer harus diisi"],
        },
    },
    { timestamps: true }
);

// Fungsi untuk mengonversi waktu UTC ke zona waktu Jakarta
// function convertToJakartaTime(utcDate) {
//     return moment.utc(utcDate).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
// }

// Middleware untuk mengonversi waktu saat mengambil data
// categorySchema.methods.toJSON = function () {
//     const obj = this.toObject();
//     obj.createdAt = convertToJakartaTime(obj.createdAt);
//     obj.updatedAt = convertToJakartaTime(obj.updatedAt);
//     return obj;
// };

// export model
module.exports = model("Category", categorySchema);
// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;
