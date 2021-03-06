require('../services').setPassportStrategies();

module.exports = {
    auth: require('./authRoutes'),
    champions: require('./championRoutes'),
    competitions: require('./competitionRoutes'),
    invites: require('./inviteRoutes'),
    matches: require('./matchRoutes'),
    teams: require('./teamRoutes'),
    teamsMatches: require('./teamMatchRoutes'),
    teamsSubscriptions: require('./teamSubscriptionRoutes'),
    users: require('./userRoutes'),
    usersSubscriptions: require('./userSubscriptionRoutes')
};