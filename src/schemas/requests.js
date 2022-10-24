const { db } = require('../libs/pgdb')
const { DataTypes } = require('sequelize')

module.exports = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.NUMBER,
    },
    requestedDate: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'requests',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['employeeId', 'requestedDate']
        }
    ]
})