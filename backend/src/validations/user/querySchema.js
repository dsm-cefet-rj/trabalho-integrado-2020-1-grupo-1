const { queryBaseSchema } = require('./baseSchemas');
const { mapValues } = require('lodash');
const yup = require('yup');

const querySchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => queryBaseSchema[key])));

module.exports = querySchema;