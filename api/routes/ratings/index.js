const router = require('express-promise-router')();
const ratingsController = require('../../controllers/ratings');

const path = '/ratings';

router.route('/')
    .post(ratingsController.postRating);

module.exports = {
    path,
    router,
};