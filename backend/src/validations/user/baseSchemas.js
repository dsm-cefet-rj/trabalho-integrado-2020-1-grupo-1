const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().max(200).matches(new RegExp('^[a-z\\s]+$', 'i'), 'name must include only letters').trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().required().min(8).max(100).trim(),
    birthdate: yup.date().required(),
    profilePictureURL: yup.string().nullable().url(),
    leagueOfLegendsUsername: yup.string().required().min(3).max(16).lowercase().trim(),
    preferredRole: yup.string().required().equals(['Top', 'Jungler', 'Mid', 'AD Carry', 'Support', 'Fill']),
    team: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}', 'i')),
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
    favoriteChampions: yup.array().of(yup.string().matches(new RegExp('^[a-f0-9]{24}', 'i'))),
};

exports.queryBaseSchema = {
    name: yup.string().max(200).matches(new RegExp('^[a-z\\s]+$', 'i'), 'name must include only letters'),
    team: yup.string().matches(new RegExp('^[a-f0-9]{24}', 'i'))
};