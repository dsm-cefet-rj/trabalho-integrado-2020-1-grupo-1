const { User } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const users = await User.find(req.filter);
            res.json(users);
        } catch(err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const { id: userId } = req.params;
            const user = await User.findById(userId).populate('team');
            res.json(user); 
        } catch(err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: userId } = req.params;
            const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
            res.json(user);
        } catch(err) {
            next(err);
        }
    },
    updateElo: async (req, res, next) => {
        try {
            const { id: userId } = req.params;
            const user = (await User.findById(userId)).updateElo();
            res.json(user);
        } catch (err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: userId } = req.params;
            await User.findByIdAndRemove(userId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};