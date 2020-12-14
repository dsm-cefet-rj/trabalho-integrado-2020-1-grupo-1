module.exports = {
    champions: require('./championRoutes'),
    competitions: require('./competitionRoutes'),
    matches: require('./matchController'),
    teams: require('./teamRoutes'),
    teamsSubscriptions: require('./teamsSubscriptionsRoutes'),
    users: require('./userRoutes'),
    usersSubscriptions: require('./usersSubscriptionsRoutes')
};