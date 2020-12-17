const yup = require('yup');

exports.bodySchema = {
    sender: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    receiver: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    team: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};

exports.querySchema = {
    receiver: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};