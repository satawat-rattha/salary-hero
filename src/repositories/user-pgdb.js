const model = require('../models/users')
const Schema = require('../schemas/users')

module.exports = {
    async create(data = model()) {
        const result = await Schema.create(data)
        return model(result.get())
    },
    async update(id, data = model()) {
        const result = await Schema.update(data, { where: { id } })
        if (!result[0]) {
            return null
        }

        return model(data)
    },
    async get(id) {
        const result = await Schema.findByPk(id)
        if (!result) {
            return null
        }

        return model(result.get())
    },
    async getByRole(id, role) {
        const result = await Schema.findOne({
            where: {
                id, role,
            }
        })
        if (!result) {
            return null
        }

        return model(result.get())
    },
    async delete(id) {
        const result = await Schema.destroy({ where: { id } })
        if (!result) {
            return false
        }
        return true
    },
    async getByUsername(username) {
        const result = await Schema.findOne({
            where: {
                username,
            }
        })

        if (!result) {
            return null
        }

        return model(result.get())
    }
}