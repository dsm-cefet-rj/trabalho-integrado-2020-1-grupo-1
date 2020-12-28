const nodemailer = require('nodemailer');
const { mailConfig } = require('../config');

module.exports = nodemailer.createTransport({
    auth: mailConfig.auth,
    host: mailConfig.host,
    port: mailConfig.port
});