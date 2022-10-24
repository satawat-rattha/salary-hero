const repo = require('../repositories/admin-pgdb')
const model = require('../models/admins')
const errors = require('../libs/errors')
const passwords = require('../libs/passwords')

const createInput = ({ companyId, username, password }) => {
    return { companyId: Number(companyId), username, password }
}

const createOutput = (data = { id, username, companyId }) => {
    return data
}

const getOutput = (data = { id, username, companyId }) => {
    return data
}

const updateInput = ({ id, companyId, username, password }) => {
    return { id: Number(id), companyId: Number(companyId), username, password }
}

const updateOutput = (data = { id, username, companyId }) => {
    return data
}

module.exports = {
    async create(input = createInput()) {
        const admin = await repo.create(model({
            ...input,
            password: passwords.hash(input.password),
        }))

        return createOutput(admin)
    },
    async get(id) {
        const admin = await repo.get(id)
        if (!admin) {
            throw errors.adminNotFound
        }

        return getOutput(admin)
    },
    async update(input = updateInput()) {
        const admin = await repo.update(model({
            ...input,
            password: passwords.hash(input.password),
        }))

        return updateOutput(admin)
    },
    delete(id) {
        return repo.delete(id)
    }
}

