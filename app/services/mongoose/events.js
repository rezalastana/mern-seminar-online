//model events
const Events = require("../../api/v1/events/model");

//checking
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");
const { checkingTalents } = require("./talents");
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

const createEvents = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category, dan talents dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    // cari events dengan field title, agar tidak ada nama yang sama
    const check = await Events.findOne({ title });

    // apabila nama sudah ada maka akan muncul error
    if (check) throw new BadRequestError(`Event ${title} sudah ada`);

    //jika tidak ada duplicat, maka create events
    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talents: talent,
    });

    return result;
};

module.exports = {
    getAllEvents,
    createEvents,
};
