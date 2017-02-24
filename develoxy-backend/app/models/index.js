// 모듈 불러오기
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// sequelize 연결 설정
const config = require('../../config/database');
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging: false
    }
);

const db = {};

// 현재 디렉토리의 모델 파일들 불러오기

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName)=> {
    if('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

// 스키마 동기화
sequelize.sync({force: false}).then(
    () => {
        console.log('Schema is synchronized');
    }).catch(err => {
        console.log('An error has occurred: ', err);
    });


db.Category.belongsTo(db.User, {foreignKey: {  
  name: 'userId',
  field: 'user_id'
}});




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;