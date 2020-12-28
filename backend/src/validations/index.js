require('../services').setupYup();

module.exports = {
    validateAuth: require('./auth'),
    validateCompetition: require('./competition'),
    validateInvite: require('./invite'),
    validateMatch: require('./match'),
    validateTeam: require('./team'),
    validateTeamMatch: require('./teamMatch'),
    validateTeamSubscription: require('./teamSubscription'),
    validateUser: require('./user'),
    validateUserSubscription: require('./userSubscription')
};