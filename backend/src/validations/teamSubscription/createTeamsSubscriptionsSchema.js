const { bodySchema } = require('./baseSchemas');
const yup = require('yup');

const createTeamSubscriptionSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createTeamSubscriptionSchema;