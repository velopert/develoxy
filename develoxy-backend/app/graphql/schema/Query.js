const Account = require('./Account');

const Query = `
    type Query {
        accounts: [Account]
        account(id: Int!): Account
    }
`

module.exports = Query;