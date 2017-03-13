const Post = `
    type Post {
        id: Int!
        title: String,
        content: String,
        preview: String,
        releaseDate: String,
        userId: Int,
        visibility: Boolean,
        isTemp: Boolean
    }
`

module.exports = Post;