// statusCodes
const { StatusCodes } = require("http-status-codes");
//service
const {
    getAllTalents,
    getOneTalents,
    createTalents,
    updateTalents,
    deleteTalents,
} = require("../../../services/mongoose/talents");

const index = async (req, res, next) => {
    try {
        const result = await getAllTalents(req);
        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get all talents",
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createTalents(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
            message: "Success create talent",
        });
    } catch (error) {
        next(error);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getOneTalents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get one talent",
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateTalents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Success update talent",
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteTalents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Success delete talent",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    create,
    find,
    update,
    destroy,
};
