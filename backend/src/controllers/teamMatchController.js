const { TeamMatch } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const teamsMatches = await TeamMatch.find(req.filter).populate('team');
            res.json(teamsMatches);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: teamsMatchesId } = req.params;
            const teamMatch = await TeamMatch.findByIdAndUpdate(teamsMatchesId, req.body, { new: true });
            res.json(teamMatch);
        } catch(err) {
            next(err);
        }
    }
};