const router = require('express-promise-router')();
const promotionsController = require('../../controllers/promotions');

const path = '/promotions';

router.route('/')
    .get(promotionsController.getAllPromotions)
    .post(promotionsController.postPromotion);

router.route('/:id')
    .get(promotionsController.getPromotionById);

module.exports = {
    path,
    router,
};