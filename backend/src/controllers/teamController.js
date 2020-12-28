const { Team } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const teams = await Team.find();
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
            const team = await Team.create({ ...req.body, administrator: req.user.id });
            res.json(team);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: teamId } = req.params;
            const team = await Team.findByIdAndUpdate(teamId, req.body, { new: true });
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