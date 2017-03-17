const Category = `
    type Category {
        id: Int!
        name: String
        parentId: Int!
        parent: Category
    }
 `

module.exports = Category;