const yup = require('yup');

exports.bodySchema = {
    printURL: yup.string().required().url()
};

exports.querySchema = {
    team: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    match: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};