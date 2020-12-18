const { bodySchema } = require('./baseSchemas');
const yup = require('yup');

const createTeamsSubscriptionsSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createTeamsSubscriptionsSchema;