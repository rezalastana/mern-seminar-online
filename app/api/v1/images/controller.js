const { StatusCodes } = require("http-status-codes");
const { createImages } = require("../../../services/mongoose/images");

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
    create,
};
