const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({});

module.exports = mongoose.model('Match', matchSchema);