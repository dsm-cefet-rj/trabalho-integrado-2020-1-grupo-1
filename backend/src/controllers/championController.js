const { Champion } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const champions = await Champion.find();
            res.json(champions);
        } catch(err) {
            next(err);
        }
    }
};