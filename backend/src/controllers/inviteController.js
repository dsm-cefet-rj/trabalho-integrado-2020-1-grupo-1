const { Invite } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const invites = await Invite.find();
            res.json(invites);
        } catch(err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const invite = await Invite.create(req.body);
            res.json(invite);
        } catch(err) {
            next(err);
        }
    },
    accept: async (req, res, next) => {
        try {
            const { id: inviteId } = req.params;
            const invite = await Invite.findById(inviteId);
            await invite.accept();
            res.json();
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: inviteId } = req.params;
            await Invite.findByIdAndDelete(inviteId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};