const mongoose = require("mongoose");
const { model, Schema } = mongoose;

// schema for image
let imageSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name image is required"],
        },
    },
    { timestamps: true }
);

module.exports = model("Image", imageSchema);
