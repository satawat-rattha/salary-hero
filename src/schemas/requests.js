const { db } = require('../libs/pgdb')
const { DataTypes, NOW } = require('sequelize')

module.exports = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    requestedDate: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    }
}, {
    tableName: 'requests',
    timestamps: false,
    indexes: [
        {
            fields: ['employeeId', 'requestedDate',]
        }
    ]
})