const router = require('express-promise-router')();
const shopController = require('../../controllers/searchByCategory');

const path = '/searchByCategory';

router.route('/:id')
    .get(shopController.searchByCategory);

module.exports = {
    path,
    router,
};