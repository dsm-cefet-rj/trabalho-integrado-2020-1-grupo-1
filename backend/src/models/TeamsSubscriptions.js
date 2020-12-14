const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamsSubscriptionsSchema = mongoose.Schema({
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

teamsSubscriptionsSchema.plugin(normalize);

module.exports = mongoose.model('TeamsSubscriptions', teamsSubscriptionsSchema);