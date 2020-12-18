const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().databaseUnique('Team').min(3).max(25).trim(),
    initials: yup.string().required().min(3).max(5).trim().uppercase(),
    logoPictureURL: yup.string().nullable().url(),
    administrator: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};

exports.querySchema = {};