const { Match } = require('../models');

module.exports = {
    findByCompetition: async (req, res, next) => {
        try {
            const { competition } = req.query;
            const matches = await Match.find({ competition });
            res.json(matches);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: matchId } = req.params;
            const match = await Match.findByIdAndUpdate(matchId, req.body);
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