const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Nama harus diisi"],
        },
        role: {
            type: String,
            default: "-",
        },
        // untuk membuat relasi dengan images pada mongodb kita perlu membuat types ObjectId
        // ref database pada mongo penamaannya sesuai dengan export yang ada pada model -> check model.js images
        image: {
            type: mongoose.Types.ObjectId,
            ref: "Image",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("Talents", talentSchema);
