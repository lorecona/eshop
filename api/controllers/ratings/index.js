const fs = require('fs');
const Rating = require('../../models/rating');

const postRating = async (req, res) => {
    try {
        const rating = new Rating(req.body);
        await rating.save();

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

module.exports = {
    postRating,
};