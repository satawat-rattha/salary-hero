const userRepo = require('../repositories/user-pgdb')
const userModel = require('../models/users')
const repo = require('../repositories/admin-pgdb')
const roles = require('../models/roles')

const createInput = ({ companyId, username, password }) => {
    return { companyId: Number(companyId), username, password }
}

const updateInput = ({ id, companyId, username, password }) => {
    return { id: Number(id), companyId: Number(companyId), username, password }
}

module.exports = {
    async create(input = createInput()) {
        const newUser = userModel(input)
        newUser.setPassword(input.password)
        newUser.setRole(roles.admin)

        const user = await userRepo.create(newUser)

        const result = await repo.create({
            ...input,
            userId: user.id,
        })

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

