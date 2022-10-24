const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')

module.exports = db.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'users',
    timestamps: false,
})