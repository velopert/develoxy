var redis = require('redis');
const bluebird = require('bluebird');

var client = bluebird.promisifyAll(redis.createClient())

client.on('connect', function() {
    console.log('Connected to Redis Server');
});

module.exports = client;