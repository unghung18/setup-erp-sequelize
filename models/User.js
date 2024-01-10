const { DataTypes } = require('sequelize');

const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
});

module.exports = User;