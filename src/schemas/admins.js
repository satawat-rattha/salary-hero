const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')

module.exports = db.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
    },
    companyId: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'admins',
    timestamps: false,
})