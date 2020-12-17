const yup = require('yup');

exports.bodySchema = {
    name: yup.string().required().min(2).max(60).trim(),
    initials: yup.string().required().min(2).max(5).trim().uppercase(),
    award: yup.object().shape({
        amount: yup.number().positive(),
        type: yup.string().required().oneOf(['RP', 'Money', 'None'])
    }),
    subscriptionInitialDate: yup.date().required(),
    subscriptionFinalDate: yup.date().required(),
    initialDate: yup.date().required(),
    finalDate: yup.date().required(),
    slots: yup.number().required().min(4).max(64),
    level: yup.string().required().oneOf(['Free', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']),
    socialMedia: yup.object().shape({
        facebook: yup.string().nullable().url().trim(),
        twitter: yup.string().nullable().url().trim(),
        instagram: yup.string().nullable().url().trim(),
        other: yup.string().nullable().url().trim()
    }),
    competitionRules: yup.string().nullable(),
    winnerTeam: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    creator: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    paused: yup.boolean()
};

exports.querySchema = {
    winnerTeam: yup.string().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
};