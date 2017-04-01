const Category = `
    type Category {
        id: Int!
        name: String
        parentId: Int!
        parent: Category
        index: Int
    }
 `

module.exports = Category;