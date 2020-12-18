const { mapValues } = require('lodash');
const yup = require('yup');

const baseTeamsSubscriptionsFilterSchema = {
    competition: yup.string(),
    team: yup.string()
};

const teamSubscriptionFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseTeamsSubscriptionsFilterSchema[key])));

module.exports = teamSubscriptionFilterSchema;