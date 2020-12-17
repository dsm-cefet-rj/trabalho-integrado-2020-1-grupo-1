const bcrypt = require('bcrypt');
const { validate: emailValidator } = require('email-validator');
const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const { utcDateFormatter } = require('../services');

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
    birthdate: {
        type: Date,
        required: true,
        transform: date => utcDateFormatter(date, 'DD/MM/YYYY')
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
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Champions'
        }],
        default: undefined
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

userSchema.statics.findByTeam = function(team) {
    return this.find({ team });
};

userSchema.plugin(normalize);

module.exports = mongoose.model('User', userSchema);