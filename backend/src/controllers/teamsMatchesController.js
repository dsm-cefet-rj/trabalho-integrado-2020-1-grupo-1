const { TeamsMatches } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const teamsMatches = await TeamsMatches.find(req.filter).populate('team');
            res.json(teamsMatches);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: teamsMatchesId } = req.params;
            const teamMatch = await TeamsMatches.findByIdAndUpdate(teamsMatchesId, req.body, { new: true });
            res.json(teamMatch);
        } catch(err) {
            next(err);
        }
    }
};