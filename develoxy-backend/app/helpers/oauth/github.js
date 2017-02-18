const config = require('../../../config/oauth').github;
const axios = require('axios');
const github = require('octonode');

module.exports = (() => {
    function generateUrl(clientId, redirectUri, scope, allowSignup) {
        return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&&allow_signup=${allowSignup}`;
    }

    return {
        url: generateUrl(config.appId, config.callbackURL, 'user', 'true'),
        getToken: (code) => {
            return axios.post('https://github.com/login/oauth/access_token', {
                client_id: config.appId,
                client_secret: config.appSecret,
                code: code,
                redirect_uri: config.callbackURL,
                state: ''
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(
                (response) => {
                    return response.data.access_token
                }
            );
        },
        getProfile: (token) => {
            const client = github.client(token);

            return new Promise((resolve, reject) => {
                client.get('/user', {}, function (err, status, body, headers) {
                    if(err) {
                        reject(err);
                    } else {
                        const { id, name, email } = body;
                        const profile = {
                            id: id.toString(),
                            name,
                            email
                        };

                        resolve(profile);
                    }
                });
            });
            

        }
    }
})()