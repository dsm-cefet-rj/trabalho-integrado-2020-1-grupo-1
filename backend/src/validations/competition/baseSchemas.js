const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().min(2).max(60).trim().when('$params', (params, schema) => params ? schema.databaseUnique('Competition', params.id) : schema).label('Nome'),
    initials: yup.string().required().min(2).max(5).trim().uppercase().label('Sigla'),
    award: yup.object().shape({
        amount: yup.number().positive().label('Valor da premiação'),
        type: yup.string().required().equals(['RP', 'Money', 'None']).label('Tipo da premiação')
    }),
    subscriptionInitialDate: yup.date().required().label('Data de início da inscrição'),
    subscriptionFinalDate: yup.date().required().when('subscriptionInitialDate', (subscriptionInitialDate, schema) => subscriptionInitialDate ? schema.min(subscriptionInitialDate) : schema).label('Data do fim da inscrição'),
    initialDate: yup.date().required().when('subscriptionFinalDate', (subscriptionFinalDate, schema) => subscriptionFinalDate ? schema.min(subscriptionFinalDate): schema).label('Data de início da competição'),
    finalDate: yup.date().required().when('initialDate', (initialDate, schema) => initialDate ? schema.min(initialDate) : schema).label('Data do fim da competição'),
    slots: yup.number().required().min(4).max(64).powerOfTwo().label('Quantidade de equipes'),
    level: yup.string().required().equals(['Free', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']).label('Nível'),
    socialMedia: yup.object().shape({
        facebook: yup.string().nullable().url().trim().label('Facebook'),
        twitter: yup.string().nullable().url().trim().label('Twitter'),
        instagram: yup.string().nullable().url().trim().label('Instagram'),
        other: yup.string().nullable().url().trim().label('Outro link')
    }),
    competitionRules: yup.string().nullable().label('Regras'),
    paused: yup.boolean()
};

exports.querySchema = {
    winnerTeam: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    creator: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    finished: yup.boolean()
};