const Query = `
    type Query {
        user(id: Int, username: String): User
        post(id: Int): Post
        posts(tag: String, category: Int, username: String, cursor: Int): Posts
    }
`

module.exports = Query;