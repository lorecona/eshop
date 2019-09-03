const router = require('express-promise-router')();
const usersController = require('../../controllers/users');

const path = '/users';

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.postUser);

router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.putUser);

router.route('/login')
    .post(usersController.login);

module.exports = {
    path,
    router,
};