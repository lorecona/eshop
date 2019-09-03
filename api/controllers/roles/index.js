const fs = require('fs');
const Role = require('../../models/role');

const getAllRoles = async (req, res) => {
    const roles = await Role.find();

    res.status(200).json({roles});
    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        res.status(200).json({roles : db.roles});
    });*/
};

module.exports = {
    getAllRoles,
};