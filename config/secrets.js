module.exports = {
    db: process.env.MONGODB || 'mongodb://localhost:27017/tech-puppies',

    sessionSecret: process.env.SESSION_SECRET || 'localhost_test_secret',
    github: {
        clientID: process.env.GITHUB_ID || 'aec72b10851936ee4105',
        clientSecret: process.env.GITHUB_SECRET || '872235a34072822a9e05e7c2521099418fb9f62c',
        callbackURL: '/auth/github/callback',
        passReqToCallback: true
    },
    tokenLife: 3600 * 24 * 7
};
