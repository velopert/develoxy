module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20), 
            allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9a-z_]{4,20}$/
            }
        },
        displayName: {
            type: DataTypes.STRING(80),
            allowNull: false,
            field: 'display_name'
        },
        provider: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        socialId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'social_id'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        thumbnail: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'user',
        underscored: true,
        classMethods: {
            findByOAuth: function(provider, socialId) {
                console.log(provider, socialId);
                return User.findOne({
                    where: { provider, socialId }
                })
            },
            findByUsername: function(username) {
                return User.findOne({
                    where: { username }
                });
            }
        }
    });

    return User;
}