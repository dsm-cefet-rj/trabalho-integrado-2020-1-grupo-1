const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const championSchema = mongoose.Schema({
    name: String,
    imageURL: String
});

championSchema.plugin(normalize);

module.exports = mongoose.model('Champion', championSchema);