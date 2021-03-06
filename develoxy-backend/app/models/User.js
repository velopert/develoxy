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
        socialId: {
            type: DataTypes.JSON,
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
        indexes: [
            {
                fields: ['username'],
                using: 'BTREE'
            },
            {
                fields: ['email'],
                using: 'BTREE'
            }
        ],
        tableName: 'user',
        underscored: true,
        classMethods: {
            findByOAuth: function(provider, socialId) {

                const idString = `socialId.${provider}`;

                return User.findOne({
                    where: {
                        [idString]: socialId
                    }
                })
            },
            findByUsername: function(username) {
                return User.findOne({
                    where: { username }
                });
            },
            findByEmail: function(email) {
                return User.findOne({
                    where: { email }
                })
            }
        },
        instanceMethods: {
            updateSocialId: function(provider, socialId) {
                const _socialId = this.socialId;
                _socialId[provider] = socialId;
                this.socialId = _socialId;
                return this.save();
            }
        }
    });

    return User;
}