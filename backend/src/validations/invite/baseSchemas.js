const yup = require('yup');

exports.bodySchema = {
    receiver: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    team: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};

exports.querySchema = {
    receiver: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};