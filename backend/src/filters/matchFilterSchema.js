const { mapValues } = require('lodash');
const yup = require('yup');

const baseMatchFilterSchema = {
    competition: yup.string()
};

const matchFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseMatchFilterSchema[key])))

module.exports = matchFilterSchema;