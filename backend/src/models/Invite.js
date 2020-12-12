const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({});

module.exports = mongoose.model('Invite', inviteSchema);