const { bodySchema } = require('./baseSchemas');
const { mapValues } = require('lodash');
const yup = require('yup');

const updateUserSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => bodySchema[key])));

module.exports = updateUserSchema;