const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const { utcDateFormater, riotAPIClient } = require('../services');
const { romanToArab } = require('roman-numbers');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        maxLength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        private: true,
        minLength: 8,
        maxLength: 100,
        set: value => bcrypt.hashSync(value, 10)
    },
    leagueID: {
        type: String,
        private: true
    },
    elo: String,
    birthdate: {
        type: Date,
        required: true,
        transform: date => utcDateFormater(date, 'DD/MM/YYYY')
    },
    profilePictureURL: {
        type: String
    },
    leagueOfLegendsUsername: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 16
    },
    preferredRole: {
        type: String,
        enum: ['Top', 'Jungler', 'Mid', 'AD Carry', 'Support', 'Fill'],
        default: 'Fill'
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        populate: {
            select: 'name initials logoPictureURL'
        }
    },
    computerSettings: {
        processor: String,
        videoCard: String,
        keyboard: String,
        mouse: String,
        headset: String
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        instagram: String,
        other: String
    },
    favoriteChampions: {
        champion1: {
            type: mongoose.Types.ObjectId,
            ref: 'Champions'
        },
        champion2: {
            type: mongoose.Types.ObjectId,
            ref: 'Champions'
        },
        champion3: {
            type: mongoose.Types.ObjectId,
            ref: 'Champions'
        }                
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.updateElo = async function () {
    const { data: eloData } = await riotAPIClient.get(`/lol/league/v4/entries/by-summoner/${this.leagueId}`);
    let elo = null;

    if(eloData.length > 0) {
        const rankedTiers = { IRON: 1, BRONZE: 2, SILVER: 3, GOLD: 4, PLATINUM: 5, DIAMOND: 6, MASTER: 7, GRANDMASTER: 8, CHALLENGER: 9 };

        eloData.sort((value1, value2) => {
            const value1Tier = rankedTiers[value1.tier];
            const value2Tier = rankedTiers[value2.tier];

            if (value1Tier == value2Tier) {
                const value1Rank = romanToArab(value1.rank);
                const value2Rank = romanToArab(value2.rank);

                if (value1Rank == value2Rank) {
                    return 0;
                }

                return value1Rank > value2Rank ? -1 : 1;
            }

            return value1Tier > value2Tier ? -1 : 1;
        });

        elo = `${eloData[0].tier} ${eloData[0].rank}`;
    }

    this.elo = elo || 'Unranked';
    return this;
};

userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

userSchema.statics.findByTeam = function(team) {
    return this.find({ team });
};

userSchema.pre('save', async function (next) {
    const { data: accountData } = await riotAPIClient.get(`/lol/summoner/v4/summoners/by-name/${this.leagueOfLegendsUsername.toLowerCase()}`);
    const id = accountData.id;

    this.leagueID = id;

    const { data: eloData } = await riotAPIClient.get(`/lol/league/v4/entries/by-summoner/${id}`);
    let elo = null;

    if(eloData.length > 0) {
        const rankedTiers = { IRON: 1, BRONZE: 2, SILVER: 3, GOLD: 4, PLATINUM: 5, DIAMOND: 6, MASTER: 7, GRANDMASTER: 8, CHALLENGER: 9 };

        eloData.sort((value1, value2) => {
            const value1Tier = rankedTiers[value1.tier];
            const value2Tier = rankedTiers[value2.tier];

            if (value1Tier == value2Tier) {
                const value1Rank = romanToArab(value1.rank);
                const value2Rank = romanToArab(value2.rank);

                if (value1Rank == value2Rank) {
                    return 0;
                }

                return value1Rank > value2Rank ? -1 : 1;
            }

            return value1Tier > value2Tier ? -1 : 1;
        });

        elo = `${eloData[0].tier} ${eloData[0].rank}`;
    }

    this.elo = elo || 'Unranked';
    next();
});

userSchema.plugin(normalize);

module.exports = mongoose.model('User', userSchema);