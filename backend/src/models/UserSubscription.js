const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const userSubscriptionSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['Top', 'Jungler', 'Mid', 'AD Carry', 'Support'],
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    competition: {
        type: mongoose.Types.ObjectId,
        ref: 'Competition',
        required: true
    }
});

userSubscriptionSchema.plugin(normalize);

module.exports = mongoose.model('UsersSubscriptions', userSubscriptionSchema);