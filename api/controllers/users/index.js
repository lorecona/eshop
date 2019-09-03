const fs = require('fs');
const User = require('../../models/user');
const Role = require('../../models/role');

const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).json({users});
    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        res.status(200).json({users : db.users});
    });*/
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        return res.status(200).json({user});
    } catch (e) {
        res.status(400).json({e});
        console.log(e)
    }

    /*fs.readFile('api/db.json', (err, data) => {
        if (err) return res.status(400).json({error: 'Unable to read file'});
        let db = JSON.parse(data);

        const users = db.users.filter(user => user.RID === parseInt(id, 10));
        res.status(200).json({users});
    });*/
};

const postUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

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
        if (!user.fname) {
            return res.status(500).json({error: 'User first name is required'});
        } else if(user.fname.length < 2)  {
            return res.status(500).json({error: 'User first name is too short'});
        } else if(user.fname.length > 20) {
            return res.status(500).json({error: 'User first name is too long'});}

        if (!user.lname) {
            return res.status(500).json({error: 'User last name is required'});
        } else if(user.lname.length < 2)  {
            return res.status(500).json({error: 'User last name is too short'});
        } else if(user.lname.length > 20) {
            return res.status(500).json({error: 'User last name is too long'});}

        if(!user.email) {
            return res.status(500).json({error: 'User email is required'});
        } else if(user.email.length > 100) {
            return res.status(500).json({error: 'User email is too long'});}

        if(!user.password) {
            return res.status(500).json({error: 'User password is required'});
        } else if (user.password < 4 ) {
            return res.status(500).json({error: 'User password is too short'});
        } else if (user.password > 25) {
            return res.status(500).json({error: 'User password is too long'});}

        const roles = db.roles;
        console.log(roles);
        if(!user.RID) {
            return res.status(500).json({error: 'The user must have a role'});
        } else if (! roles.find(role => role.id === user.RID)) {
            return res.status(500).json({error: 'The role picked is not a valid role'});}

        if(db && db.users && db.users.length > 0){
            const lastId = db.users[db.users.length-1].id;
            user.id = lastId + 1;
        } else {
            user.id = 1;
        }
        db.users.push(user);
        fs.writeFile('api/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(400).json({error: 'Unable to write file'});
        });
        res.status(200).json(db.users);
    });*/
};

const putUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
            .populate('RID');

        if (!user) {
            res.status(400).json({error: 'User not found'});
        }

        if(req.body.fname){
            user.fname = req.body.fname;
        }
        if(req.body.lname){
            user.lname = req.body.lname;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        await user.save();
        return res.status(200).json({user});

    } catch(e) {
        res.status(400).json({e});
    }
};

const login = async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username, password: req.body.password})
            .populate('RID');

        if (!user) {
            res.status(400).json({error: 'User not found'});
        }

        return res.status(200).json({user});

    } catch(e) {
        res.status(400).json({e});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    login,
    postUser,
    putUser,
};