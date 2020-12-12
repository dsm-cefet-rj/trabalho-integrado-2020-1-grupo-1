module.exports = {
    auth: {
        user: process.env.MAIL_AUTH_USER,
        password: process.env.MAIL_AUTH_PASSWORD
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT
};