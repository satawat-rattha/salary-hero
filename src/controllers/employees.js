const repo = require('../repositories/employee-pgdb')

const createInput = ({ firstname, lastname, companyId, salary }) => {
    return {
        firstname,
        lastname,
        companyId: Number(companyId),
        salary: Number(salary),
    }
}

const updateInput = ({ id, firstname, lastname, companyId, salary }) => {
    return {
        id: Number(id),
        firstname,
        lastname,
        companyId: Number(companyId),
        salary: Number(salary),
    }
}

const importInput = (data = [{ id: null, firstname, lastname, salary }]) => {
    return data.map(({ id, firstname, lastname, salary }) =>
        ({ id, firstname, lastname, salary }))
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
    },
    async import(companyId, input = importInput()) {
        const data = input.map(({ id = null, firstname, lastname, salary }) =>
            ({ id, companyId, firstname, lastname, salary }))

        return await repo.import(data)
    }
}

