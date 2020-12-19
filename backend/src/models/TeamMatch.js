const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamMatchSchema = mongoose.Schema({
    match: {
        type: mongoose.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    printURL: String
});

teamMatchSchema.plugin(normalize);

module.exports = mongoose.model('TeamMatch', teamMatchSchema);