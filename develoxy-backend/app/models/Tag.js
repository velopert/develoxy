module.exports = function(sequelize, DataTypes) {
    const Tag = sequelize.define('Tag', {
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
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tag',
        underscored: true,
        indexes: [
            {
                fields: ['post_id'],
                using: 'BTREE'
            },
            {
                fields: ['tag'],
                using: 'BTREE'
            }
        ]
    });

    return Tag;
}