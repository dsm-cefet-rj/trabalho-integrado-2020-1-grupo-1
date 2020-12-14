const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const inviteSchema = mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    }
});

inviteSchema.plugin(normalize);

module.exports = mongoose.model('Invite', inviteSchema);