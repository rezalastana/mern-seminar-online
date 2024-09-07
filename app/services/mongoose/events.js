//model events
const Events = require("../../api/v1/events/model");

//checking
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");
//error
const { NotFoundError, BadRequestError } = require("../../errors");
const { path } = require("express/lib/application");

const getAllEvents = async (req) => {
    const { keyword, category, talents } = req.query;

    let condition = {};

    // condition for searching by keyword
    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    }
    if (category) {
        await checkingCategories(category);
        condition = { ...condition, category };
    }
    if (talents) {
        condition = { ...condition, talents: { $in: talents } };
    }

    const result = await Events.find(condition)
        .populate({
            path: "image",
            select: "_id name",
        })
        .populate({
            path: "category",
            select: "_id name",
        })
        .populate({
            path: "talents",
            select: "_id name role image",
            // karena membutuhkan image dari talents, maka perlu di populate lagi ke image
            populate: {
                path: "image",
                select: "_id name",
            },
        });
    return result;
};

module.exports = {
    getAllEvents,
};
