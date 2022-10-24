const { Op } = require('sequelize')
const model = require('../models/requests')
const Schema = require('../schemas/requests')

module.exports = {
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