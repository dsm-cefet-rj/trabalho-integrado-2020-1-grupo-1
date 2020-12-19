const { mapValues } = require('lodash');
const yup = require('yup');

const baseTeamSubscriptionFilterSchema = {
    competition: yup.string(),
    team: yup.string()
};

const teamSubscriptionFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseTeamSubscriptionFilterSchema[key])));

module.exports = teamSubscriptionFilterSchema;