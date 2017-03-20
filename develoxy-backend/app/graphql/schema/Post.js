const Post = `
    type Post {
        id: Int!
        title: String
        content: String
        preview: String
        releaseDate: String
        userId: Int
        visibility: Boolean
        isTemp: Boolean
        tags: [String]
        categories: [Category]
        user: User
    }
    type Posts {
        data: [Post]
        next: String
    }
`

module.exports = Post;