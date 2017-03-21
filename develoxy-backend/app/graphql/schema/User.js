const User = `
    type User {
        id: Int!
        username: String
        displayName: String
        thumbnail: String
        categories: [Category]
    }
`;

module.exports = User