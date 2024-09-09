//import from service
const {
    getAllEvents,
    createEvents,
    getOneEvents,
    updateEvents,
    deleteEvents,
} = require("../../../services/mongoose/events");

const { StatusCodes } = require("http-status-codes");

//index / get All
const index = async (req, res, next) => {
    try {
        const result = await getAllEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get all events",
        });
    } catch (error) {
        next(error);
    }
};
//create
const create = async (req, res, next) => {
    try {
        const result = await createEvents(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
            message: "Created events",
        });
    } catch (error) {
        next(error);
    }
};

//get one
const find = async (req, res, next) => {
    try {
        const result = await getOneEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Get one events",
        });
    } catch (error) {
        next(error);
    }
};

//update
const update = async (req, res, next) => {
    try {
        const result = await updateEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Updated events",
        });
    } catch (error) {
        next(error);
    }
};

//destroy
const destroy = async (req, res, next) => {
    try {
        const result = await deleteEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
            message: "Deleted events",
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
