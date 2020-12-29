const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().max(200).matches(new RegExp('^[a-záàâãéèêíïóôõöúçñ\\s]+$', 'i'), '${path} deve conter apenas letras').trim().label('Nome'),
    email: yup.string().required().email().trim().when('$user', (user, schema) => user ? schema.databaseUnique('User', user.id) : schema.databaseUnique('User')).label('Email'),
    password: yup.string().required().min(8).max(100).trim().label('Senha'),
    birthdate: yup.date().required().label('Data de nascimento'),
    profilePictureURL: yup.string().nullable().url(),
    leagueOfLegendsUsername: yup.string().required().min(3).max(16).trim().when('$user', (user, schema) => user ? schema.databaseUnique('User', user.id) : schema.databaseUnique('User')).label('Username do League of Legends'),
    preferredRole: yup.string().required().equals(['Top', 'Jungler', 'Mid', 'AD Carry', 'Support', 'Fill']).label('Role Preferida'),
    team: yup.string().nullable().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    computerSettings: yup.object().shape({
        processor: yup.string().nullable().trim().label('Processador'),
        videoCard: yup.string().nullable().trim().label('Placa de vídeo'),
        keyboard: yup.string().nullable().trim().label('Teclado'),
        mouse: yup.string().nullable().trim().label('Mouse'),
        headset: yup.string().nullable().trim().label('Headset')
    }),
    socialMedia: yup.object().shape({
        facebook: yup.string().nullable().url().trim().label('Facebook'),
        twitter: yup.string().nullable().url().trim().label('Twitter'),
        instagram: yup.string().nullable().url().trim().label('Instagram'),
        other: yup.string().nullable().url().trim().label('Outro link')
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