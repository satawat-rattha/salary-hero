const errors = require('../libs/errors')
const repo = require('../repositories/request-pgdb')
const employeeRepo = require('../repositories/employee-pgdb')
const dayjs = require('dayjs')

const createInput = ({ employeeId, companyId, amount }) => {
    return {
        employeeId: Number(employeeId),
        companyId: Number(companyId),
        amount: Number(amount),
    }
}

const updateInput = ({ id, employeeId, companyId, amount }) => {
    return {
        id: Number(id),
        employeeId: Number(employeeId),
        companyId: Number(companyId),
        amount: Number(amount),
    }
}

module.exports = {
    async create(input = createInput()) {
        const employee = await employeeRepo.get(input.companyId)
        if (!employee) {
            throw errors.employeeNotFound
        }

        const startDate = dayjs().startOf('M').toDate()
        const now = new Date()

        const total = await repo.sumAmountRequest(input.employeeId, startDate, now)
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

