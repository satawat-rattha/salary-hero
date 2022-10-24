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
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false,
})