const Item = require('../../models/item');
const Rating = require('../../models/rating');
const Promotion = require('../../models/promotion');

const getAllItems = async (req, res) => {
    const { CID, distributor, range } = req.query;
    console.log(req.query);
    const findParams = {};
    if (CID) {
        findParams.CID = `${CID}`;
    }
    if (distributor){
        findParams.distributor = `${distributor}`;
    }
    if(range){
        findParams.price = {$gt: `${range[0]}`, $lt: `${range[1]}`}
    }
    const items = await Item.find(findParams);

    for (let i = 0; i<items.length; i++ ) {
        const ratings = await Rating.find({ SID : items[i]._id});
        const promotion = await Promotion.findOne({_id : items[i].PID});
        items[i]._doc.ratings = ratings;
        items[i]._doc.promotion = promotion;
        if(promotion && promotion.type === "Numeric"){
            items[i]._doc.promoPrice = items[i].price - promotion.value;
        } else if (promotion && promotion.type === "Procent"){
            items[i]._doc.promoPrice = items[i].price - (items[i].price * promotion.value)/100;
        }
    }
    res.status(200).json({items});
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        const ratings = await Rating.find({ SID : req.params.id});
        const promotion = await Promotion.findOne({_id : item.PID});

        item._doc.ratings = ratings;
        item._doc.promotion = promotion;
        if(promotion && promotion.type === "Numeric"){
            item._doc.promoPrice = item.price - promotion.value;
        } else if (promotion && promotion.type === "Procent"){
            item._doc.promoPrice = item.price - (item.price * promotion.value)/100;
        }

        return res.status(200).json({item});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

const deleteItem = async (req, res) => {
    try {
        const response = await Item.deleteOne({_id: req.params.id});
        return res.status(200).json({response});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

const putItem = async (req, res) => {
    try {
        const item = await Item.findById(req.body._id);
        if (req.body.name) {
            item.name = req.body.name;
        }
        if(req.body.description){
            item.description = req.body.description;
        }
        if(req.body.CID){
            item.CID = req.body.CID;
        }
        if(req.body.distributor){
            item.distributor = req.body.distributor;
        }
        if(req.body.image){
            item.image = req.body.image;
        }
        if(req.body.price){
            item.price = req.body.price;
        }
        await item.save();

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }
};

const postItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();

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
        if (!item.name){
            return res.status(500).json({error: 'Item name is required'});
        } else if(item.name.length < 2)  {
            return res.status(500).json({error: 'Item name is too short'});
        } else if(item.name.length > 50) {
            return res.status(500).json({error: 'Item name is too long'});}

        if(!item.description) {
            return res.status(500).json({error: 'Item description is missing'});
        } else if(item.description.length < 10) {
            return res.status(500).json({error: 'Item description is too short'});
        } else if(item.description.length > 75) {
            return res.status(500).json({error: 'Item description is too long'});}

        if(!item.price) {
            return res.status(500).json({error: 'Item price is required'});
        } else if (item.price <=0 ) {
            return res.status(500).json({error: 'Item price must be a positive number'});}

        const categories = db.categories;
        if(!item.CID) {
            return res.status(500).json({error: 'Item category is required'});
        } else if (! categories.find(category => category.id === item.CID)) {
            return res.status(500).json({error: 'Item category is not a valid category'});}

        if(!item.distributor) {
            return res.status(500).json({error: 'Item distributor is required'});
        } else if (item.distributor.length > 35) {
            return res.status(500).json({error: 'Item distributor name is too long'});}

        if(!item.image) {
            return res.status(500).json({error: 'Item image is required'});
        }

        if(db && db.shopItems && db.shopItems.length > 0){
            const lastId = db.shopItems[db.shopItems.length-1].id;
            item.id = lastId + 1;
        } else {
            item.id = 1;
        }
        db.shopItems.push(item);
        fs.writeFile('api/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(400).json({error: 'Unable to write file'});
        });
        res.status(200).json(db.shopItems);
    });*/
};

module.exports = {
    getAllItems,
    getItemById,
    postItem,
    putItem,
    deleteItem,
};