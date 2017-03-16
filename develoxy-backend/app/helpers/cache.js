// redis wrapper
const redis = require('redis');

module.exports = (function() {

    let client = null;

    function connect() {
        client = redis.createClient();

        client.on('connect', function() {
            console.log('Connected to Redis Server');
        });
    }

    function set(key, value, stringify = true) {
        client.set(key, stringify ? JSON.stringify(value) : value);
    }

    function get(key, parseJSON = true) {
        const promise = new Promise(
            (resolve, reject) => {
                client.get(key, (err, reply) => {
                    if(err) { reject(err); }
                    resolve(parseJSON ? JSON.parse(reply) : reply);
                });
            }
        );

        return promise;
    }

    function del(key) {
        client.del(key);
    }

    function inject(handler, key) {
        return params => {
            let needsCaching = false;
            // promise 생성
            const promise = new Promise(
                (resolve, reject) => {
                    get(`${key}:${params}`).then(
                        cached => {
                            // 캐시가 존재 할 시 이걸 리턴함
                            if(cached) { 
                                return Promise.resolve(cached);
                            } else {
                                // 캐시가 존재하지 않을 시
                                needsCaching = true;
                                return handler(params);
                            }
                        }
                    ).then(
                        data => {
                            // 캐싱을 해야 하는 경우
                            if(needsCaching) {
                                set(`${key}:${params}`, data);
                            }

                            resolve(data);
                        }
                    );
                }
            );

            return promise;
        }
    }

    return {
        connect,
        set,
        get,
        del,
        inject
    }
})();