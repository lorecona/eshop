const fs = require('fs');
const Item = require('../../models/item');

const searchByCategory = async (req, res) => {
    try {
        const items = await Item.find({ CID : req.params.id});

        return res.status(200).json({items});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        const items = db.shopItems.filter(item => item.CID === parseInt(id, 10));
        res.status(200).json({items});
    });*/
};

module.exports = {
    searchByCategory,
};