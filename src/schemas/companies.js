const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')

module.exports = db.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'companies',
    timestamps: false,
})