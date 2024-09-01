const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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
    },
    { timestamps: true }
);

// export model
module.exports = model("Category", categorySchema);
