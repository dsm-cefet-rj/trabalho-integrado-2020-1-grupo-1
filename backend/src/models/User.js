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
        trim: true,
        maxLength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: value => emailValidator(value),
            message: ({ value }) => `${value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        private: true,
        trim: true,
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
        trim: true,
        minLength: 3,
        maxLength: 16
    },
    preferredRole: {
        type: String,
        enum: ['Top', 'Jungler', 'Mid', 'AD Carry', 'Support', 'Fill']
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        populate: {
            select: 'name initials logoPictureURL'
        }
    },
    computerSettings: {
        type: Map,
        of: String
    },
    socialMedia: {
        type: Map,
        of: String
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