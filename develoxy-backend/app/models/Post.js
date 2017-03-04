module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: '제목없음',
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            field: 'release_date'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        visibility: {
            type: DataTypes.ENUM('public', 'private'),
            allowNull: false,
            default: 'public'
        },
        isTemp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true,
            field: 'is_temp'
        }
    }, {
        tableName: 'post',
        underscored: true,
        indexes: [
            {
                fields: ['user_id'],
                using: 'BTREE'
            },
            {
                fields: ['release_date'],
                using: 'BTREE'
            }
        ]
    });

    return Post;
}

//         indexes: [
//             {
//                 fields: ['username'],
//                 using: 'BTREE'
//             },
//             {
//                 fields: ['email'],
//                 using: 'BTREE'
//             }
//         ],
//         tableName: 'user',
//         underscored: true,
//         classMethods: {
//             findByOAuth: function(provider, socialId) {

//                 const idString = `socialId.${provider}`;

//                 return User.findOne({
//                     where: {
//                         [idString]: socialId
//                     }
//                 })
//             },
//             findByUsername: function(username) {
//                 return User.findOne({
//                     where: { username }
//                 });
//             },
//             findByEmail: function(email) {
//                 return User.findOne({
//                     where: { email }
//                 })
//             }
//         },
//         instanceMethods: {
//             updateSocialId: function(provider, socialId) {
//                 const _socialId = this.socialId;
//                 _socialId[provider] = socialId;
//                 this.socialId = _socialId;
//                 return this.save();
//             }
//         }
//     });

//     return User;
// }