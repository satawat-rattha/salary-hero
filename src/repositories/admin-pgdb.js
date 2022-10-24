const model = require('../models/admins')
const Schema = require('../schemas/admins')
const userSchema = require('../schemas/users')

module.exports = {
    async create(data = model()) {
        const user = await userSchema.create({
            username: data.username,
            password: data.password,
            role: data.role,
        })

        const admin = await Schema.create({
            userId: user.id,
            companyId: data.companyId,
        })

        return model({
            id: admin.getDataValue('id'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: admin.getDataValue('companyId'),
        })
    },
    async update(data = model()) {
        const admin = await Schema.findByPk(data.id)
        if (!admin) {
            return null
        }

        admin.setDataValue('companyId', data.companyId)

        const user = await userSchema.findByPk(admin.userId)
        if (!user) {
            return null
        }

        user.setDataValue('username', data.username)
        user.setDataValue('password', data.password)

        await Promise.all([admin.save(), user.save()])

        return model({
            id: admin.getDataValue('id'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: admin.getDataValue('companyId'),
        })
    },
    async get(id) {
        const admin = await Schema.findByPk(id)
        if (!admin) {
            return null
        }

        const user = await userSchema.findByPk(admin.getDataValue('userId'))
        if (!user) {
            return null
        }

        return model({
            id: admin.getDataValue('id'),
            username: user.getDataValue('username'),
            password: user.getDataValue('password'),
            companyId: admin.getDataValue('companyId'),
        })
    },
    async delete(id) {
        const admin = await Schema.findByPk(id)
        let result = await userSchema.destroy({ where: { id: admin.getDataValue('userId') } })
        if (!result) {
            return false
        }

        result = await Schema.destroy({ where: { id } })
        if (!result) {
            return false
        }

        return true
    }
}