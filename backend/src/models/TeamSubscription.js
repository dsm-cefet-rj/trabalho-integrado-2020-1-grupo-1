const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamSubscriptionSchema = mongoose.Schema({
    competition: {
        type: mongoose.Types.ObjectId,
        ref: 'Competition',
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    }
});

teamSubscriptionSchema.plugin(normalize);

module.exports = mongoose.model('TeamSubscription', teamSubscriptionSchema);