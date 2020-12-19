const { UserSubscription } = require('../models');

module.exports = {
    create: async (req, res, next) => {
        try {
            const subscription = await UserSubscription.create(req.body);
            res.json(subscription);
        } catch(err) {
            next(err);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id: subscriptionId } = req.params;
            await UserSubscription.findByIdAndDelete(subscriptionId);
            res.json();
        } catch(err) {
            next(err);
        }
    }
};