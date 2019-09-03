const router = require('express-promise-router')();
const categoriesController = require('../../controllers/categories');

const path = '/categories';

router.route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.postCategory);

router.route('/:id')
    .get(categoriesController.getCategoryById);

module.exports = {
    path,
    router,
};