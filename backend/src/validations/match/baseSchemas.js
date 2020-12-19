const yup = require('yup');

exports.bodySchema = {
    winnerTeam: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};

exports.querySchema = {
    competition: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};