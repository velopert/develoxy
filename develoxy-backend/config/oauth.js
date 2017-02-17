module.exports = {
    google: {
        appId: '581789705557-en68p43o7hlsr4gv4nalina60h30qclc.apps.googleusercontent.com',
        appSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/google/callback'
    },
    facebook: {
        appId: '295985334149305',
        appSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/facebook/callback'
    }
}