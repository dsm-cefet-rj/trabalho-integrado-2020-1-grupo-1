const { TeamSubscription } = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const subscriptions = await TeamSubscription.find(req.filter).populate('team').populate('competition');
            res.json(subscriptions);
        } catch(err) {
            next(err);
        }
    },
    create: async(req, res, next) => {
        try {
            const subscription = await TeamSubscription.create(req.body);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: subscriptionId } = req.params;
            const subscription = await TeamSubscription.findById(subscriptionId);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    }
};