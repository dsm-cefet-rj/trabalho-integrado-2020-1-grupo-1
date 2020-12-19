const { bodySchema } = require('./baseSchemas');
const { mapValues } = require('lodash');
const yup = require('yup');

const updateTeamsMatchesSchemas = yup.lazy(builder => yup.object().noUnknown().shape(mapValues(builder, (value, key) => bodySchema[key])));

module.exports = updateTeamsMatchesSchemas;