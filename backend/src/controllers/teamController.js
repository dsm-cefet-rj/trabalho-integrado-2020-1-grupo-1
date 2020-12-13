const { Team } = require('../models');

module.exports = {
    index: async (req, res) => {
        try {
            const teams = await Team.find();
            res.json(teams);
        } catch(err) {
            throw err;
        }
    },
    show: async (req, res) => {
        try {
            const { id: teamId } = req.params;
            const team = await Team.findById(teamId).populate('administrator');
            res.json(team);
        } catch(err) {
            throw err;
        }
    },
    create: async (req, res) => {
        try {
            const team = await Team.create(req.body);
            res.json(team);
        } catch(err) {
            throw err;
        }
    },
    update: async (req, res) => {
        try {
            const { id: teamId } = req.params;
            const team = await Team.findByIdAndUpdate(teamId, req.body);
            res.json(team);
        } catch(err) {
            throw err;
        }
    },
    destroy: async (req, res) => {
        try {
            const { id: teamId } = req.params;
            await Team.findByIdAndDelete(teamId);
            res.json();
        } catch(err) {
            throw err;
        }
    }
};