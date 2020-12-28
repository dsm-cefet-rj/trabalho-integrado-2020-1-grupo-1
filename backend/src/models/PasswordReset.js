const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const { v4: uuidv4 } = require('uuid');
const { appConfig, mailConfig } = require('../config');
const { mailTransporter } = require('../services');

const passwordResetSchema = mongoose.Schema({
    token: String,
    email: String
});

passwordResetSchema.pre('save', async function(next) {
    const token = uuidv4();
    const url = `${appConfig.client}?token=${token}&email=${this.email}`;
    const user = await mongoose.model('User').findOne({ email: this.email });

    await mailTransporter.sendMail({
        sender: `${mailConfig.fromName} <${mailConfig.fromAddress}`,
        to: `${user.name} <${user.email}>`,
        subject: 'Password Reset',
        text: `Dear ${user.name}, you have requested a password reset in Battleside, to perform it, access this URL: ${url}`,
        html: `<p>Dear ${user.name}, you have requested a password reset in Battleside, to perform it, access this URL: <a>${url}</a></p>`,
    });

    this.token = await bcrypt.hash(token, 10);
    next();
});

passwordResetSchema.methods.compareToken = async function(token) {
    return await bcrypt.compare(token, this.token);
};

passwordResetSchema.plugin(normalize);

module.exports = mongoose.model('PasswordReset', passwordResetSchema);