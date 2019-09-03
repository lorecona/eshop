const Promotion = require('../../models/promotion');

const getAllPromotions = async (req, res) => {
    const promotions = await Promotion.find();

    res.status(200).json({promotions});
};
const getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);

        return res.status(200).json({promotion});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

const postPromotion = async (req, res) => {
    try {
        const newPromotion = new Promotion(req.body);
        await newPromotion.save();

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

module.exports = {
    getAllPromotions,
    getPromotionById,
    postPromotion,
};
