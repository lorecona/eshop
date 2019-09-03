const bodyParser = require('body-parser');
const cors = require('cors');

const ordersRoutes = require('../../routes/orders');
const shopRoutes = require('../../routes/shop');
const categoriesRoutes = require('../../routes/categories');
const searchByCategoryRoutes = require('../../routes/searchByCategory');
const rolesRoutes = require('../../routes/roles');
const usersRoutes = require('../../routes/users');
const ratingsRoutes = require('../../routes/ratings');
const promotionsRoutes = require('../../routes/promotions');
const User = require('../../models/user');
const Role = require('../../models/role');

const setAppConfig = (app) => {
    app.use(cors());
    app.use(bodyParser.json());

    const AUTH_GUARD = [
        { method: 'POST', path: '/ratings' },
        { method: 'POST', path: '/orders' },
       // { method: 'GET', path: '/shop' },
    ];
    const ADMIN_GUARD = [
        { method: 'GET', path: '/orders' },
        { method: 'POST', path: '/orders/:id'},
    ];

    // auth middleware here
    app.use(async (req, res, next) => {
        const { originalUrl, method } = req;
        const isRouteGuarded = AUTH_GUARD.find((route) => route.method === method && route.path === originalUrl);
        const isRouteGuardedAdmin = ADMIN_GUARD.find((route) => route.method === method && route.path === originalUrl);

        if (isRouteGuardedAdmin) {
            const { authorization } = req.headers;

            if (!authorization) {
                return  res.status(400).json({
                    error: 'Unauthorized'
                });
            }
            else {
                const [username, password] = authorization.split(':');

                try{
                    const user = await User.findOne({username, password});
                    const userRole = await Role.findById(user.RID);

                    if (!user) {
                        return res.status(400).json({error: 'User not found!'});
                    } else if (userRole.role !== "Admin"){
                        return res.status(400).json({error: 'User is not an Admin!'});
                    }
                    else {
                        req.user = user;
                    }
                } catch(e) {
                    console.log('heeereere');
                    return res.status(400).json({e});
                }
            }
        }

        if (isRouteGuarded) {
            const { authorization } = req.headers;

            if (!authorization) {
                res.status(400).json({
                    error: 'Unauthorized'
                });
            }
            else {
                const [username, password] = authorization.split(':');

                    try{
                        const user = await User.find({username, password});
                        if (!user) {
                            res.status(400).json({error: 'User not found'});
                        }
                        else {
                            req.user = user;
                        }
                    } catch(e) {
                        res.status(400).json({e});
                    }
            }
        }
        next();
    });

    app.use(ordersRoutes.path, ordersRoutes.router);
    app.use(shopRoutes.path, shopRoutes.router);
    app.use(categoriesRoutes.path, categoriesRoutes.router);
    app.use(searchByCategoryRoutes.path, searchByCategoryRoutes.router);
    app.use(rolesRoutes.path, rolesRoutes.router);
    app.use(usersRoutes.path, usersRoutes.router);
    app.use(ratingsRoutes.path, ratingsRoutes.router);
    app.use(promotionsRoutes.path, promotionsRoutes.router);
};

module.exports = setAppConfig;