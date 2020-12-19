const { mapValues } = require('lodash');
const yup = require('yup');

const baseCompetitionFilterSchema = {
    winnerTeam: yup.string(),
    creator: yup.string(),
    finished: yup.boolean()
};

const competitionFilterSchema = yup.lazy(builder => yup.object().noUnknown().shape(mapValues(builder, (value, key) => baseCompetitionFilterSchema[key])));

module.exports = competitionFilterSchema;