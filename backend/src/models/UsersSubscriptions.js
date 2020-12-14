const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const usersSubscriptionsSchema = mongoose.Schema({
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
    subscription: {
        type: mongoose.Types.ObjectId,
        ref: 'TeamsSubscriptions',
        required: true
    }
});

usersSubscriptionsSchema.plugin(normalize);

module.exports = mongoose.model('UsersSubscriptions', usersSubscriptionsSchema);