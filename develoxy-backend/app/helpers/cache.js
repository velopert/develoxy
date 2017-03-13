// redis wrapper
const redis = require('redis');

module.exports = (() => {

    let client = null;

    return {
        connect: () => {
            client = redis.createClient();

            client.on('connect', function() {
                console.log('Connected to Redis Server');
            });
        },
        set: (key, value, stringify = true) => {
            client.set(key, stringify ? JSON.stringify(value) : value);
        },
        get: (key, parseJSON = true) => {
            const promise = new Promise(
                (resolve, reject) => {
                    client.get(key, (err, reply) => {
                        if(err) { reject(err); }
                        resolve(parseJSON ? JSON.parse(reply) : reply);
                    });
                }
            );

            return promise;
        },
        test: () => {
            console.log(client);
        }
    }
})();