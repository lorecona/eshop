const router = require('express-promise-router')();
const shopController = require('../../controllers/shop');

const path = '/shop';

router.route('/')
    .get(shopController.getAllItems)
    .post(shopController.postItem)
    .put(shopController.putItem);

router.route('/:id')
    .get(shopController.getItemById)
    .delete(shopController.deleteItem);

module.exports = {
    path,
    router,
};