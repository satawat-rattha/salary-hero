const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')

module.exports = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    salary: {
        type: DataTypes.NUMBER,
    },
    companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}, {
    tableName: 'employees',
    timestamps: false,
})