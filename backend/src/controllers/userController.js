const { User } = require('../models');

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            throw err;
        }
    },
    show: async (req, res) => {
        try {
            const { id: userId } = req.params;
            const user = await User.findById(userId).populate('team');
            res.json(user); 
        } catch(err) {
            throw err;
        }
    },
    findByName: async (req, res) => {
        try {
            const { name } = req.query;
            const users = await User.findByName(name);
            res.json(users);
        } catch(err) {
            throw err;
        }
    },
    create: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            throw err;
        }
    },
    update: async (req, res) => {
        try {
            const { id: userId } = req.params;
            const user = await User.findByIdAndUpdate(userId, req.body);
            res.json(user);
        } catch(err) {
            throw err;
        }
    },
    destroy: async (req, res) => {
        try {
            const { id: userId } = req.params;
            await User.findByIdAndRemove(userId);
            res.json();
        } catch(err) {
            throw err;
        }
    }
};