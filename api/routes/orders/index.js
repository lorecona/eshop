const router = require('express-promise-router')();
const ordersController = require('../../controllers/orders');

const path = '/orders';

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.postOrder);

router.route('/:id')
    .get(ordersController.getOrderById)
    .post(ordersController.markCompleted);

router.route('/user/:id')
    .get(ordersController.getOrdersForUser);

module.exports = {
    path,
    router,
};