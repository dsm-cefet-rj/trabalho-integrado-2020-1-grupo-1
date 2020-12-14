const { UsersSubscription } = require('../models');

module.exports = {
    create: async (req, res, next) => {
        try {
            const subscription = await UsersSubscription.create(req.body);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: subscriptionId } = req.params;
            await UsersSubscription.findByIdAndDelete(subscriptionId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};