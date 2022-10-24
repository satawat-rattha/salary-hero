const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')

module.exports = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    salary: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
}, {
    tableName: 'employees',
    timestamps: false,
})