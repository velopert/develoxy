const User = require('./User');
const Query = require('./Query');

const Schema = `
    schema {
        query: Query
    }    
`;

module.exports = [Schema, Query, User];