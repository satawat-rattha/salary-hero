const repo = require('../repositories/company-pgdb')

const createInput = ({ name = '' }) => {
    return { name }
}

const updateInput = ({ id, name }) => {
    return { id: Number(id), name }
}

module.exports = {
    async create(input = createInput()) {
        const result = await repo.create(input)

        return result
    },
    async get(id) {
        const result = await repo.get(id)

        return result
    },
    async update(input = updateInput()) {
        const result = await repo.update(input.id, input)

        return result
    },
    async delete(id) {
        return await repo.delete(id)
    }
}

