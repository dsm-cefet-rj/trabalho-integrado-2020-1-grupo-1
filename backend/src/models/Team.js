const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({});

module.exports = mongoose.model('Team', teamSchema);