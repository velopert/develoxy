const google = require('googleapis');
const config = require('../../../config/oauth').google;
const OAuth2 = google.auth.OAuth2;
const plus = google.plus('v1');

module.exports = (()=>{
    
    const client = new OAuth2(
        config.appId,
        config.appSecret,
        config.callbackURL
    );

    function tempClient() {
        return new OAuth2(
            config.appId,
            config.appSecret
        );
    }

    const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];
    
    const url = client.generateAuthUrl({
        scope: scopes
    });
    

    return {
        url: url,
        getToken: (code) => {
            const p = new Promise((resolve, reject) => {
                client.getToken(code, (err, tokens) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(tokens.access_token);
                })
            });

            return p;
        },
        getProfile: (token) => {
            console.log(token);
            const tc = tempClient();

            tc.setCredentials({
                access_token: token
            });

            return new Promise((resolve,reject) => {
                plus.people.get({
                    userId: 'me',
                    auth: tc
                }, (err, response) => {
                    if(err) return reject(err);
                    const profile = {
                        id: response.id,
                        email: response.emails[0].value,
                        displayName: response.displayName.indexOf(" (") ? response.displayName.split(" (")[0] : response.displayName
                    }
                    resolve(profile);
                });
            });
            
        }

    }
})();

