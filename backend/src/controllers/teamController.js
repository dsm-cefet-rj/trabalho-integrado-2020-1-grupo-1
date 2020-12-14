const { Team, TeamsSubscriptions, TeamsMatches } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const teams = await Team.find();
            res.json(teams);
        } catch(err) {
            next(err);
        }
    },
    findByCompetition: async (req, res, next) => {
        try {
            const { competition } = req.query;
            const teams = await TeamsSubscriptions.find({ competition }).populate('team').map(subscription => subscription.team);
            res.json(teams);
        } catch(err) {
            next(err);
        }
    },
    findByMatch: async (req, res, next) => {
        try {
            const { match } = req.query;
            const teams = await TeamsMatches.find({ match }).populate('team').map(subscription => subscription.team);
            res.json(teams);
        } catch(err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const { id: teamId } = req.params;
            const team = await Team.findById(teamId).populate('administrator');
            res.json(team);
        } catch(err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const team = await Team.create(req.body);
            res.json(team);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: teamId } = req.params;
            const team = await Team.findByIdAndUpdate(teamId, req.body);
            res.json(team);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: teamId } = req.params;
            await Team.findByIdAndDelete(teamId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};