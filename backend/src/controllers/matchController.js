const { Match } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const matches = await Match.find(req.filter);
            res.json(matches);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: matchId } = req.params;
            const match = await Match.findByIdAndUpdate(matchId, req.body, { new: true });
            res.json(match);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: matchId } = req.params;
            await Match.findByIdAndDelete(matchId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};