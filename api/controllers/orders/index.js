const fs = require('fs');
const Order = require('../../models/order');

const getAllOrders = async (req, res) => {
    const user = req.user;
    const { range, isCompleted } = req.query;
    console.log(req.query);
    const findParams = {};
    if(range){
        findParams.totalPrice = {$gt: `${range[0]}`, $lt: `${range[1]}`}
    }
    if (isCompleted){
        findParams.isCompleted = `${isCompleted}`;
    }
    const orders = await Order.find(findParams);

    res.status(200).json({orders});

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);
        res.status(200).json({orders : db.orders});
    });*/
};


const markCompleted = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        order.isCompleted = true;
        await order.save();

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        return res.status(200).json({order});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        const order = db.orders.find(order => order.id === parseInt(id, 10));
        res.status(200).json({order});
    });*/
};

const getOrdersForUser = async (req, res) => {
    try {
        const orders = await Order.find({UID: req.params.id});

        return res.status(200).json({orders});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

};

const postOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);
        if (!order.name) {
            return res.status(500).json({error: 'Item name is required'});
        } else if(order.name.length < 2)  {
            return res.status(500).json({error: 'Customer name is too short'});}

        if (!order.phone) {
            return res.status(500).json({error: 'Customer phone is required'});
        } else if(order.phone.length < 10) {
            return res.status(500).json({error: 'Customer phone is too short'});
        } else if(order.phone.length > 10) {
            return res.status(500).json({error: 'Customer phone is too long'});}

        if (!order.address) {
            return res.status(500).json({error: 'Customer address is required'});
        } else if(order.address.length) {
            return res.status(500).json({error: 'Customer address is too short'});}

        if(db && db.orders && db.orders.length > 0){
            const lastId = db.orders[db.orders.length-1].id;
            order.id = lastId + 1;
        } else {
             order.id = 1;
        }
        db.orders.push(order);
        fs.writeFile('api/db.json', JSON.stringify(db, null, 2), (err) => {
             if (err) return res.status(400).json({error: 'Unable to write file'});
        });
        res.status(200).json(db.orders);
    });*/
};

module.exports = {
    getAllOrders,
    getOrderById,
    postOrder,
    markCompleted,
    getOrdersForUser,
};