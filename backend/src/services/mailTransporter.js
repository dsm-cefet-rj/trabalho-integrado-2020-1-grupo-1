const nodemailer = require('nodemailer');
const { mailConfig } = require('../config');

module.exports = nodemailer.createTransport(mailConfig);