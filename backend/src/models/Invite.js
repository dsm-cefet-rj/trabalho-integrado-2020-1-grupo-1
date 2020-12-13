const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const inviteSchema = mongoose.Schema({
    sender: {

    },
    receiver: {

    },
    team: {
        
    }
});

inviteSchema.plugin(normalize);

module.exports = mongoose.model('Invite', inviteSchema);