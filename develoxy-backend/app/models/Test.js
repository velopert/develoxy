module.exports = function (sequelize, DataTypes) {
    const Test = sequelize.define('Test', {
        test: {
            type: DataTypes.STRING
        }
    });
    return Test;
}