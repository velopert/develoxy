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
        // userId,
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'parent_id',
            defaultValue: 0
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['parent_id'],
                using: 'BTREE'
            },
            {
                fields: ['index'],
                using: 'BTREE'
            }
        ],
        tableName: 'category',
        underscored: true,
        classMethods: {
            countBaseLeaves: function(userId) {
                return Category.count({where: {
                    userId,
                    parentId: 0
                }});
            },
            countChildren: function({parentId, userId}) {
                return Category.count({
                    where: {
                        parentId,
                        userId
                    }
                });
            },
            findByUserId: function(userId) {
                return Category.findAll({
                    where: {
                        userId
                    },
                    raw: true,
                    order: [
                        ['parentId', 'ASC'],
                        ['index', 'ASC']
                    ],
                    attributes: { exclude: ['created_at', 'updated_at', 'userId'] }
                });
            },
            findByParentId: function(parentId) {
                return Category.findAll({
                    where: {
                        parentId
                    },
                    order: [
                        ['index', 'ASC']
                    ]
                });
            },
            findAllDescendant: async function(rootId) {

                // 특정 카테고리의 모든 자식들을 불러온다.
                async function getChildren(id) {
                    return Category.findAll({
                        where: {
                            parentId: id
                        },
                        raw: true
                    }).map(child=>child.id);
                }

                let categories = []; // 이 배열에 모든 자손들을 넣는다.
                let children = await getChildren(rootId);
                children.forEach(id => categories.push(id)); // 2차 카테고리
                while(children.length > 0) {
                    // 각 child의 children들을 가져온다.
                    const promises = children.map(getChildren);
                    const childrenGroups = await Promise.all(promises); // [1,2,3],[5,6],[7,8]

                    let flatten = [];
                    
                    // 각 배열에서 꺼내서 flatten 안에 넣는다
                    childrenGroups.forEach(
                        children => {
                            flatten = flatten.concat(children)
                            categories = categories.concat(children);
                        }
                    );

                    // children 을 flatten으로 대체한다.
                    children = flatten;

                    // 이제 이 카테고리들의 자식들을 조사함.
                }

                return categories;
            }
        },
        instanceMethods: {
            update: function(parent, index) {
                this.parent = parent;
                this.index = index;
                return this.save();
            },
            moveUp: function() {
                this.index = this.index - 1;
                return this.save();
            },
            moveDown: function() {
                this.index = this.index + 1;
                return this.save();
            },
            setParentId: function(parentId) {
                this.parentId = parentId;
                return this.save();
            },
            rename: function(name) {
                this.name = name;
                return this.save();
            }
        }
    });

    return Category
}