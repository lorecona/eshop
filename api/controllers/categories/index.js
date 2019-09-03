const fs = require('fs');
const Category = require('../../models/category');

const getAllCategories = async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({categories});
    // fs.readFile('api/db.json', (err, data) => {
    //     if (err) return res.status(400).json({error: 'Unable to read file'});
    //     let db = JSON.parse(data);
    //     res.status(200).json({categories : db.categories});
    // });
};
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        return res.status(200).json({category});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        const category = db.categories.find(category => category.id === parseInt(id, 10));
        res.status(200).json({category});
    });*/
};

const postCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();

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
        console.log(JSON.parse(data));
        if(!category.name) {
            return res.status(500).json({error: 'Category name is required'});
        } else if(category.name.length < 2) {
            return res.status(500).json({error: 'Category name is too short'});
        } else if(category.name.length > 30) {
            return res.status(500).json({error: 'Category name is too long'});
        }

        if(db.categories.length > 0){
            const lastId = db.categories[db.categories.length-1].id;
            category.id = lastId + 1;
        } else {
            category.id = 1;
        }
        db.categories.push(category);
        fs.writeFile('api/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(400).json({error: 'Unable to write file'});
        });
        res.status(200).json(db.categories);
    });*/
};

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
};
