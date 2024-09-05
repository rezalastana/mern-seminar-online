const { StatusCodes } = require("http-status-codes");
const {
    getAllImages,
    createImages,
} = require("../../../services/mongoose/images");

const index = async (req, res, next) => {
    try {
        const result = await getAllImages();
        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get all images",
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        console.log(req.file); //tampilkan req.file

        const result = await createImages(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
            message: "Success create image",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    create,
};
