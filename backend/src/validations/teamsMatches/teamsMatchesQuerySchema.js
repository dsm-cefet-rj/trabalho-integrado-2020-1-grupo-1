const { querySchema } = require('./baseSchemas');
const { mapValues } = require('lodash');
const yup = require('yup');

const teamsMatchesQuerySchema = yup.lazy(builder => yup.object().noUnknown().shape(mapValues(builder, (value, key) => querySchema[key])));

module.exports = teamsMatchesQuerySchema;