const { body } = require('./baseSchema');
const yup = require('yup');

const passwordResetSchema = yup.object().shape(body);

module.exports = passwordResetSchema;