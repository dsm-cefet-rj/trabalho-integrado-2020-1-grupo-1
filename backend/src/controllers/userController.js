const { User } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch(err) {
            next(err);
        }
    },
    findByName: async (req, res, next) => {
        try {
            const { name } = req.query;
            const users = await User.findByName(name);
            res.json(users);
        } catch(err) {
            next(err);
        }
    },
    findByEmail: async (req, res, next) => {
        try {
            const { email } = req.query;
            const user = await User.findOne({ email }).populate('team');
            res.json(user);
        } catch(err) {
            next(err);
        }
    },
    findByTeam: async (req, res, next) => {
        try {
            const { team } = req.query;
            const users = await User.findByTeam(team);
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