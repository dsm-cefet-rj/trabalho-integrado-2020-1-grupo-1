const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().max(200).matches(new RegExp('^[a-záàâãéèêíïóôõöúçñ\\s]+$', 'i'), 'name must include only letters').trim(),
    email: yup.string().required().email().trim().when('$user', (user, schema) => user ? schema.databaseUnique('User', user.id) : schema),
    password: yup.string().required().min(8).max(100).trim(),
    birthdate: yup.date().required(),
    profilePictureURL: yup.string().nullable().url(),
    leagueOfLegendsUsername: yup.string().required().min(3).max(16).trim().when('$user', (user, schema) => user ? schema.databaseUnique('User', user.id) : schema),
    preferredRole: yup.string().required().equals(['Top', 'Jungler', 'Mid', 'AD Carry', 'Support', 'Fill']),
    team: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    computerSettings: yup.object().shape({
        processor: yup.string().nullable().trim(),
        videoCard: yup.string().nullable().trim(),
        keyboard: yup.string().nullable().trim(),
        mouse: yup.string().nullable().trim(),
        headser: yup.string().nullable().trim()
    }),
    socialMedia: yup.object().shape({
        facebook: yup.string().nullable().url().trim(),
        twitter: yup.string().nullable().url().trim(),
        instagram: yup.string().nullable().url().trim(),
        other: yup.string().nullable().url().trim()
    }),
    favoriteChampions: yup.object().noUnknown().shape({
        champion1: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
        champion2: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
        champion3: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
    }),
};

exports.querySchema = {
    name: yup.string().required().max(200).matches(new RegExp('^[a-z\\s]+$', 'i'), 'name must include only letters').trim(),
    team: yup.string().required().matches(new RegExp('^[a-f0-9]{24}', 'i'))
};