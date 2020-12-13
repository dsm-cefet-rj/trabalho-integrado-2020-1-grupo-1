const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const competitionSchema = mongoose.Schema({
    name: {
        
    },
    award: {

    },
    subscriptionInitialDate: {

    },
    subscriptionFinalDate: {

    },
    initialDate: {

    },
    finalDate: {

    },
    slots: {

    },
    level: {

    },
    socialMedia: {

    },
    competitionRules: {

    },
    winnerTeam: {

    },
    creator: {

    },
    paused: {
        
    }
});

competitionSchema.plugin(normalize);

module.exports = mongoose.model('Competition', competitionSchema);