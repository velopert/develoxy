const FB = require('fb');

const config = require('../../../config/oauth').facebook;

module.exports = (() => {
    FB.options({
        appId: config.appId,
        appSecret: config.appSecret,
        redirectUri: config.callbackURL
    });

    return {
        url: FB.getLoginUrl({
            scope: 'email',
            redirect_uri: config.callbackURL
        }),//`https://www.facebook.com/v2.8/dialog/oauth?client_id=${config.appId}&redirect_uri=${config.callbackURL}`,
        getToken: (code) => {
            return new Promise((resolve, reject) => {
               FB.api('oauth/access_token', {
                   client_id: config.appId,
                   client_secret: config.appSecret,
                   redirect_uri: config.callbackURL,
                   code: code
               }, (res) => {
                    if(!res || res.error) {
                       reject(!res ? 'error occurred' : res.error);
                       return;
                    }
                    const accessToken = res.access_token;
                    resolve(accessToken);                    
               })
            });
        },
        getProfile: (token) => {
            return new Promise((resolve, reject) => {
                FB.api("me", {
                    fields: ['id', 'name', 'email'],
                    access_token: token
                }, res => {
                    if(!res || res.error) {
                        reject(!res ? 'error occurred' : res.error);
                    } else {
                        const {
                            id, name, email
                        } = res;
                        resolve({
                            id,
                            displayName: name,
                            email
                        });
                    }
                });
            });
        }
    }
})();
