const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const championSchema = mongoose.Schema({
    name: {
        type: String
    },
    imageURL: {
        type: String
    }
});

championSchema.plugin(normalize);

module.exports = mongoose.model('Champion', championSchema);