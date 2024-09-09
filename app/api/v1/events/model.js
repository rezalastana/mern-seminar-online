const mongoose = require("mongoose");

// ada 2 buath schema dalam 1 file kenapa tidak dipisah?
// karena ticketCategoriesSchema hanya digunakan pada eventSchema
//  ticketCategories schema
const ticketCategoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Type tiket harus diisi"],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    statusTicketCategory: {
        type: Boolean,
        enum: [true, false],
        default: true,
    },
    expired: {
        type: Date,
    },
});

// events schema
const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Judul harus diisi"],
            minLength: [3, "Panjang title minimal 3 karakter"],
            maxLength: [50, "Panjang title maksimal 50 karakter"],
        },
        date: {
            type: Date,
            required: [true, "Tanggal dan waktu harus diisi"],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, "Tagline harus diisi"],
        },
        keyPoint: {
            type: [String],
        },
        venueName: {
            type: String,
            required: [true, "Nama tempat harus diisi"],
        },
        statusEvent: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft",
        },
        tickets: {
            // karena mungkin ada beberapa jenis tiket, maka dibuat array
            type: [ticketCategoriesSchema],
            required: [true],
        },
        image: {
            // jika hanya ingin menampilkan 1 data saja, maka menggunakan obh
            type: mongoose.Types.ObjectId,
            ref: "Image",
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        talent: {
            type: mongoose.Types.ObjectId,
            ref: "Talent",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
