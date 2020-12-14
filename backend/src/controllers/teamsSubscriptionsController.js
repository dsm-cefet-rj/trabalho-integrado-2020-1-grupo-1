const { TeamsSubscriptions } = require('../models');

module.exports = {
    create: async(req, res, next) => {
        try {
            const subscription = await TeamsSubscriptions.create(req.body);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: subscriptionId } = req.params;
            const subscription = await TeamsSubscriptions.findById(subscriptionId);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    }
};