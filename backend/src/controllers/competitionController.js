const { Competition } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const competitions = await Competition.find(req.filter);
            res.json(competitions);
        } catch(err) {
            next(err);
        }
    },
    show: async (req, res, next) => {
        try {
            const { id: competitionId } = req.params;
            const competition = await Competition.findById(competitionId);
            res.json(competition);
        } catch(err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const competition = await Competition.create(req.body);
            res.json(competition);
        } catch(err) {
            next(err);
        }
    },
    createMatches: async (req, res, next) => {
        try {
            const { id: competitionId } = req.params;
            const competition = await Competition.findById(competitionId);
            const matches = await competition.createMatches();
            res.json(matches);
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: competitionId } = req.params;
            const competition = await Competition.findByIdAndUpdate(competitionId, req.body, { new: true });
            res.json(competition);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: competitionId } = req.params;
            await Competition.findByIdAndDelete(competitionId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};