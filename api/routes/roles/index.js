const router = require('express-promise-router')();
const rolesController = require('../../controllers/roles');

const path = '/roles';

router.route('/')
    .get(rolesController.getAllRoles);

module.exports = {
    path,
    router,
};