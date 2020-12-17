const { mapValues } = require('lodash');
const yup = require('yup');

const baseUserFilterSchema = {
    name: yup.mixed().transform((value) => new RegExp(value, 'i')),
    team: yup.string()
};

const userFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseUserFilterSchema[key])))

module.exports = userFilterSchema;