const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const matchSchema = mongoose.Schema({
    matchCode: {

    },
    competition: {

    },
    winner: {
        
    }
});

matchSchema.plugin(normalize);

module.exports = mongoose.model('Match', matchSchema);