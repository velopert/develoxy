const Account = require('./Account');
const Query = require('./Query');

const { merge } = require('lodash');

console.log(merge(Account, Query))

module.exports = merge(Account, Query);