const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const normalize = require('normalize-mongoose');

const matchSchema = mongoose.Schema({
    matchCode: {
        type: String
    },
    competition: {
        type: mongoose.Types.ObjectId,
        ref: 'Competition',
        required: true
    },
    successor: {
        type: mongoose.Types.ObjectId,
        ref: 'Match',
    },
    winner: {
        type: mongoose.Types.ObjectId,
        ref: 'Team'
    }
});

matchSchema.pre('save', function(next) {
    this.matchCode = uuidv4();
    next();
});

matchSchema.post('updateOne', async function(doc) {
    if(!doc.successor) {
        await mongoose.model('Competition').findByIdAndUpdate(doc.competition, { winnerTeam: doc.winner, finished: true });
    }
});

matchSchema.plugin(normalize);

module.exports = mongoose.model('Match', matchSchema);