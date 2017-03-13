const Query = `
    type Query {
        user(id: Int, username: String): User
        post(id: Int): Post
    }
`

module.exports = Query;