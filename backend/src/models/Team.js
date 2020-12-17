const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    initials: {
        type: String,
        required: true,
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

teamSchema.post('save', async function(doc) {
    await mongoose.model('User').findByIdAndUpdate(doc.administrator, { team: doc.id });
    next();
});

teamSchema.plugin(normalize);

module.exports = mongoose.model('Team', teamSchema);