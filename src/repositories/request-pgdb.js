const { db } = require('../libs/pgdb')
const { DataTypes, Op } = require('sequelize')
const model = require('../models/requests')

const Schema = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
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

module.exports = {
    Schema,
    async create(data = model()) {
        const result = await Schema.create(data)

        return model(result.get())
    },
    sumAmountRequest(employeeId, startDate, endDate) {
        return Schema.sum('amount', {
            where: {
                employeeId,
                requestedDate: {
                    [Op.between]: [startDate, endDate]
                },
            }
        })
    }
}