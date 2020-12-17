const { querySchema } = require('./baseSchemas');
const { mapValues } = require('lodash');
const yup = require('yup');

const userQuerySchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => querySchema[key])));

module.exports = userQuerySchema;