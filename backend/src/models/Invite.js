const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const inviteSchema = mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        populate: {
            select: 'name'
        }
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        populate: {
            select: 'name'
        }
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true,
        populate: {
            select: 'name initials'
        }
    }
});

inviteSchema.methods.accept = async function() {
   await mongoose.model('User').findByIdAndUpdate(this.receiver, { team: this.team });
   this.remove(); 
};

inviteSchema.plugin(normalize);

module.exports = mongoose.model('Invite', inviteSchema);