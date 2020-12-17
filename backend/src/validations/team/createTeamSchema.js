const { bodySchema } = require('./baseSchemas');
const yup = require('yup');

const createTeamSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createTeamSchema;