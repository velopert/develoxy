const Query = `
    type Query {
        user(id: Int, username: String): User
    }
`

module.exports = Query;