//model events
const Events = require("../../api/v1/events/model");

//checking
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");
const { checkingTalents } = require("./talents");
//error
const { NotFoundError, BadRequestError } = require("../../errors");

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
            path: "talent",
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
    if (check) throw new BadRequestError(`Event ${title} sudah terdaftar`);

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
        talent,
    });

    return result;
};

const getOneEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({ _id: id })
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
            populate: {
                path: "image",
                select: "_id name",
            },
        })
        .select(
            "_id title date about tagline venueName keyPoint statusEvent tickets image category talents"
        );

    if (!result)
        throw new NotFoundError(`Event dengan id : ${id} tidak ditemukan`);

    return result;
};

const updateEvents = async (req) => {
    const { id } = req.params;
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

    //cari image, category, dan talents dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    //cari events dengan field id diatas, agar tidak terjadi duplikasi
    const check = await Events.findOne({
        title,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError(`Event ${title} sudah terdaftar`);

    //jika tidak ada duplikasi, maka update events
    const result = await Events.findOneAndUpdate(
        { _id: id },
        {
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
        },
        {
            new: true,
            runValidators: true,
        }
    );

    // jika tidak ada data dengan id yang dicari
    if (!result) throw new BadRequestError(`Tidak ada event dengan id : ${id}`);

    return result;
};

const deleteEvents = async (req) => {
    const { id } = req.params;

    //hapus data dengan id yang dicari
    const result = await Events.findOneAndDelete({ _id: id });

    if (!result) throw new BadRequestError(`Tidak ada event dengan id : ${id}`);

    return result;
};

module.exports = {
    getAllEvents,
    createEvents,
    getOneEvents,
    updateEvents,
    deleteEvents,
};
