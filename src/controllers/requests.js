const errors = require('../libs/errors')
const repo = require('../repositories/request-pgdb')
const employeeRepo = require('../repositories/employee-pgdb')
const dayjs = require('dayjs')

const createInput = ({ userId, amount }) => {
    return {
        userId: Number(userId),
        amount: Number(amount),
    }
}

module.exports = {
    async create(input = createInput()) {
        const employee = await employeeRepo.getByUserId(input.userId)
        if (!employee) {
            throw errors.employeeNotFound
        }

        const startDate = dayjs().startOf('M').toDate()
        const now = new Date()

        const total = await repo.sumAmountRequest(employee.id, startDate, now)
        if (!employee.isAvailableRequest(total + input.amount)) {
            throw errors.isNotAvailableRequest
        }

        const result = await repo.create({
            ...input,
            requestedDate: now,
        })

        return result
    },
}

