const models = require('./index');

module.exports = function(sequelize, DataTypes) {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'user',
                key: 'id'
            }
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'parent_id'
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'category',
        underscored: true
    });

    return Category
}