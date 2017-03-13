const User = require('./User');
const Query = require('./Query');
const Post = require('./Post');


const Schema = `
    schema {
        query: Query
    }    
`;

module.exports = [
    Schema, 
    Query, 
    Post, 
    User
];