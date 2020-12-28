const { body } = require('./baseSchema');
const yup = require('yup');

const requestPasswordResetSchema = yup.object().shape({ email: body.email });

module.exports = requestPasswordResetSchema;