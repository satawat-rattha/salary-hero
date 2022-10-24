const model = require('../models/employees')
const Schema = require('../schemas/employees')
const userSchema = require('../schemas/users')

module.exports = {
    async create(data = model()) {
        const user = await userSchema.create({
            username: data.username,
            password: data.password,
            role: data.role,
        })

        const employee = await Schema.create({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            userId: user.getDataValue('id'),
            salary: data.salary,
            companyId: data.companyId
        })

        return model({
            id: employee.getDataValue('id'),
            firstname: employee.getDataValue('firstname'),
            lastname: employee.getDataValue('lastname'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: employee.getDataValue('companyId'),
            salary: employee.getDataValue('salary')
        })
    },
    async update(data = model()) {
        const employee = await Schema.findByPk(data.id)
        if (!employee) {
            return null
        }

        employee.setDataValue('firstname', data.firstname)
        employee.setDataValue('lastname', data.lastname)
        employee.setDataValue('salary', data.salary)
        employee.setDataValue('companyId', data.companyId)

        const user = await userSchema.findByPk(employee.getDataValue('userId'))
        if (!user) {
            return null
        }

        user.setDataValue('username', data.username)
        user.setDataValue('password', data.password)

        await Promise.all([employee.save(), user.save()])

        return model({
            id: employee.getDataValue('id'),
            firstname: employee.getDataValue('firstname'),
            lastname: employee.getDataValue('lastname'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: employee.getDataValue('companyId'),
            salary: employee.getDataValue('salary')
        })
    },
    async get(id) {
        const employee = await Schema.findByPk(id)
        if (!employee) {
            return null
        }

        const user = await userSchema.findByPk(employee.getDataValue('userId'))
        if (!user) {
            return null
        }

        return model({
            id: employee.getDataValue('id'),
            firstname: employee.getDataValue('firstname'),
            lastname: employee.getDataValue('lastname'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: employee.getDataValue('companyId'),
            salary: employee.getDataValue('salary')
        })
    },
    async delete(id) {
        const employee = await Schema.findByPk(id)
        let result = await userSchema.destroy({ where: { id: employee.getDataValue('userId') } })
        if (!result) {
            return false
        }

        result = await Schema.destroy({ where: { id } })
        if (!result) {
            return false
        }

        return true
    },
    async import(data = [model()]) {
        const userData = data.map(d => ({
            username: d.username,
            password: d.password,
        }))

        const users = await userSchema.bulkCreate(userData, {
            updateOnDuplicate: ['username'],
        })

        const employeeData = data.map(d => {
            const user = users.find(u => u.getDataValue('username') === d.username)

            return {
                id: d.id,
                firstname: d.firstname,
                lastname: d.lastname,
                userId: user.getDataValue('id'),
                salary: d.salary,
                companyId: d.companyId
            }
        })

        const employees = await Schema.bulkCreate(employeeData, {
            updateOnDuplicate: ['id']
        })

        return employees.map(employee => {
            const user = users.find(u => u.getDataValue('username') === employee.getDataValue('username'))

            return model({
                id: employee.getDataValue('id'),
                firstname: employee.getDataValue('firstname'),
                lastname: employee.getDataValue('lastname'),
                username: user.getDataValue('username'),
                password: user.getDataValue('password'),
                companyId: employee.getDataValue('companyId'),
                salary: employee.getDataValue('salary')
            })
        })
    }
}