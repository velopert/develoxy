const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const Schema = require('./schema');
const resolvers = require('./resolvers');

module.exports  = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: resolvers
});