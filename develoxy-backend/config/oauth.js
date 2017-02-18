const environment = require('./environment');

const url = environment[process.env.NODE_ENV].url;


module.exports = {
    google: {
        appId: '581789705557-en68p43o7hlsr4gv4nalina60h30qclc.apps.googleusercontent.com',
        appSecret: process.env.GOOGLE_SECRET,
        callbackURL: url + '/api/auth/google/callback'
    },
    facebook: {
        appId: '295985334149305',
        appSecret: process.env.FACEBOOK_SECRET,
        callbackURL: url + '/api/auth/facebook/callback'
    },
    github: {
        appId: 'e3c105814fde9cbccc88',
        appSecret: process.env.GITHUB_SECRET,
        callbackURL: url + '/api/auth/github/callback'
    }
}