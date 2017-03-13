const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const schema = require('./schema');
const resolvers = require('./resolvers');

const Schema  = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});

module.exports = Schema;

// module.exports = async (ctx, next) => {
//     const { query, variables } = ctx.request.body;
//     const { userId } = ctx.request;

//     if(!query) {
//         ctx.status = 400;
//         ctx.body = {
//             message: 'invalid request'
//         };
//         return;
//     }
//     try {
//         const result = await graphql(Schema, query, { userId }, variables);
//         ctx.body = result;
//     } catch (e) {
//         ctx.status = 400;
//         ctx.body = {
//             message: "GraphQL Error",
//             description: e.message
//         };
//     }
// }