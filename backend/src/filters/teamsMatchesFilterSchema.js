const { mapValues } = require('lodash');
const yup = require('yup');

const baseTeamsMatchesFilterSchema = {
    team: yup.string(),
    match: yup.string()
};

const teamsMatchesFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseTeamsMatchesFilterSchema[key])));

module.exports = teamsMatchesFilterSchema;