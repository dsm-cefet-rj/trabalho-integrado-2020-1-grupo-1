const { chunk, shuffle } = require('lodash');
const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const { utcDateFormatter } = require('../services');

const competitionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 2,
        maxLength: 60
    },
    initials: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minLength: 2,
        maxLength: 5
    },
    award: {
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['RP', 'Money', 'None'],
            required: true
        }
    },
    subscriptionInitialDate: {
        type: Date,
        required: true,
        transform: date => utcDateFormatter(date, 'DD/MM/YYYY')
    },
    subscriptionFinalDate: {
        type: Date,
        required: true,
        transform: date => utcDateFormatter(date, 'DD/MM/YYYY')
    },
    initialDate: {
        type: Date,
        required: true,
        transform: date => utcDateFormatter(date, 'DD/MM/YYYY')
    },
    finalDate: {
        type: Date,
        required: true,
        transform: date => utcDateFormatter(date, 'DD/MM/YYYY')
    },
    slots: {
        type: Number,
        required: true,
        min: 4,
        max: 64
    },
    level: {
        type: String,
        required: true,
        enum: ['Free', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']
    },
    socialMedia: {
        type: Map,
        of: String
    },
    competitionRules: {
        type: String,
        trim: true
    },
    winnerTeam: {
        type: mongoose.Types.ObjectId,
        ref: 'Team'
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paused: {
        type: Boolean,
        default: false
    }
});

competitionSchema.methods.createMatches = async function() {
    const teams = await this.getSubscribedTeams();
    const amountTeams = teams.length;
    const amountMatches = Math.pow(2, Math.ceil(Math.log2(amountTeams))) - 1;
    const matchesArray = Array(amountMatches);

    for(let index = 0; index < amountMatches; index++) {
        const sucessorIndex = Math.floor(index / 2) - 1;
        const match = await mongoose.model('Match').create({
            competition: this.id,
            sucessor: sucessorIndex != -1 ? matchesArray[sucessorIndex].id : null
        });
        matchesArray[index] = match;
    }

    const confrontationsArray = chunk(shuffle(teams), 2);

    for(let index = 0; index < confrontationsArray.length; index++) {
        const value = confrontationsArray[index];
        const match = matchesArray[matchesArray.length - (1 + index)];

        if(value.length = 2) {
            await mongoose.model('TeamsMatches').insertMany([{ match: match.id, team: value[0] }, { match: match.id, team: value[1] }]);
        } else {
            const sucessorMatch = matchesArray.find(element => element.id == match.sucessor);
            await mongoose.model('TeamsMatches').create({ match: sucessorMatch.id, team: value[0] });
        }
    }

    return matchesArray;
};

competitionSchema.methods.getSubscribedTeams = async function() {
    const subscriptions = await mongoose.model('TeamsSubscriptions').find({ competition: this.id }).populate('team');
    const teams = subscriptions.map(value => value.team);
    return teams;
};

competitionSchema.plugin(normalize);

module.exports = mongoose.model('Competition', competitionSchema);