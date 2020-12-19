const { mapValues } = require('lodash');
const yup = require('yup');

const baseTeamMatchFilterSchema = {
    team: yup.string(),
    match: yup.string()
};

const teamMatchFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseTeamMatchFilterSchema[key])));

module.exports = teamMatchFilterSchema;