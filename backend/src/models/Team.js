const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 25
    },
    initials: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        minLength: 3,
        maxLength: 5
    },
    logoPictureURL: {
        type: String
    },
    administrator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        populate: {
            select: 'name'
        }
    }
});

teamSchema.plugin(normalize);

module.exports = mongoose.model('Team', teamSchema);