const model = require('../models/employees')
const repo = require('../repositories/employee-pgdb')
const passwords = require('../libs/passwords')
const errors = require('../libs/errors')

const createInput = ({ citizenId, firstname, lastname, companyId, password, salary }) => {
    return {
        id: Number(citizenId),
        firstname,
        lastname,
        password,
        companyId: Number(companyId),
        salary: Number(salary),
    }
}

const createOutput = ({ id, firstname, lastname, username, password, companyId, salary }) => {
    return {
        id, citizenId: id, firstname, lastname, username, password, companyId, salary
    }
}

const getOutput = ({ id, firstname, lastname, username, password, companyId, salary }) => {
    return {
        id, citizenId: id, firstname, lastname, username, password, companyId, salary
    }
}

const updateInput = ({ citizenId, firstname, lastname, companyId, username, password, salary }) => {
    return {
        id: Number(citizenId),
        firstname,
        lastname,
        username,
        password,
        companyId: Number(companyId),
        salary: Number(salary),
    }
}

const updateOutput = ({ id, firstname, lastname, companyId, salary }) => {
    return {
        id, citizenId: id, firstname, lastname, companyId, salary
    }
}

const importInput = (data = [{ citizenId, firstname, lastname, password, salary }]) => {
    return data
}

const importOutput = (data = [{ citizenId, firstname, lastname, username, password, salary }]) => {
    return data.map(({ id, firstname, lastname, companyId, salary, username, password }) => ({
        id, citizenId: id, firstname, lastname, companyId, salary, username, password
    }))
}

module.exports = {
    async create(input = createInput()) {
        const result = await repo.create(model({
            ...input,
            password: passwords.hash(passwords),
        }))

        return createOutput(result)
    },
    async get(id) {
        const result = await repo.get(id)
        if (!result) {
            throw errors.employeeNotFound
        }

        return getOutput(result)
    },
    async update(input = updateInput()) {
        const result = await repo.update(model({
            ...input,
            password: passwords.hash(passwords),
        }))

        return updateOutput(result)
    },
    delete(id) {
        return repo.delete(id)
    },
    async import(companyId, input = importInput()) {
        const data = input.map(({ citizenId, firstname, lastname, password, salary }) => model({
            id: citizenId,
            firstname,
            lastname,
            salary,
            companyId,
            username: citizenId,
            password: passwords.hash(password),
        }))

        const result = await repo.import(data)

        return importOutput(result)
    }
}

