const { bodySchema } = require('./baseSchemas');
const pick = require('object.pick');
const yup = require('yup');

const createTeamSchema = yup.object().noUnknown().shape(pick(bodySchema, ['name', 'initials', 'award', 'subscriptionInitialDate', 'subscriptionFinalDate', 'initialDate', 'finalDate', 'slots', 'level', 'creator']));

module.exports = createTeamSchema;