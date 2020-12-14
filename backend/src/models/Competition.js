const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const _ = require('lodash');

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
            required: () => this.award.type != 'None'
        },
        type: {
            type: String,
            enum: ['RP', 'Money', 'None']
        }
    },
    subscriptionInitialDate: {
        type: Date,
        required: true
    },
    subscriptionFinalDate: {
        type: Date,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    finalDate: {
        type: Date,
        required: true
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
        ref: 'User'
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

    matchesArray.forEach(async (value, index, array) => {
        const sucessor = Match.floor(index/2) - 1;
        const match = await mongoose.model('Match').create({
            competition: this.id,
            sucessor: sucessor != -1 ? array(sucessor).id : null
        });
        array[index] = match;
    });

    _.chunk(_.shuffle(teams), 2).forEach(async (value, index, array) => {
        const match = array[array.length - (1 + index)];

        if(value.length = 2) {
            await mongoose.model('TeamsMatches').createMany({ match: match.id, team: value[0] }, { match: match.id, team: value[1] });
        } else {
            const sucessorMatch = matchesArray.find(element => element.id == match.sucessor);
            await mongoose.model('TeamsMatches').create({ match: sucessorMatch.id, team: value[0] });
        }
    });
};

competitionSchema.methods.getSubscribedTeams = async function() {
    const teams = await mongoose.model('TeamsSubscriptions').find({ competition: this.id }).populate('team').map(subscription => subscription.team);
    return teams;
};

competitionSchema.plugin(normalize);

module.exports = mongoose.model('Competition', competitionSchema);