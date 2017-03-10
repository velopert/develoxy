module.exports = function(sequelize, DataTypes) {
    const PostCategory = sequelize.define('PostCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'post_id'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id'
        }
    }, {
        tableName: 'post_category',
        underscored: true,
        indexes: [
            {
                fields: ['post_id'],
                using: 'BTREE'
            },
            {
                fields: ['category_id'],
                using: 'BTREE'
            }
        ],
        classMethods: {
            findByPostId: function(postId) {
                return PostCategory.findAll({
                    where: {
                        postId
                    }
                });
            },
            destroyByPostCategory: function({postId, categoryId}) {
                return PostCategory.destroy({
                    where: {
                        postId,
                        categoryId
                    }
                });
            }
        }
    });

    return PostCategory;
}