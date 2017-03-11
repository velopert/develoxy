const Account = require('./Account');
const Query = require('./Query');

const Schema = `
    schema {
        query: Query
    }    
`;

module.exports = [Schema, Query, Account];