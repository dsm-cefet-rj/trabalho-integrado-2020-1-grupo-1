const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().min(3).max(25).trim().when('$params', (params, schema) => params ? schema.databaseUnique('Team', params.id) : schema.databaseUnique('Team')).label('Nome da equipe'),
    initials: yup.string().required().min(3).max(5).trim().uppercase().label('Sigla da equipe'),
    logoPictureURL: yup.string().nullable().url(),
};

exports.querySchema = {};