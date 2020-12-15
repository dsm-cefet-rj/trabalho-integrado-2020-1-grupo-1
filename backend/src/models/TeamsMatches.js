const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamsMatchesSchema = mongoose.Schema({
    match: {
        type: mongoose.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    }
});

teamsMatchesSchema.plugin(normalize);

module.exports = mongoose.model('TeamsMatches', teamsMatchesSchema);