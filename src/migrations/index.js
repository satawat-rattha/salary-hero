const admins = require('../schemas/admins')
const companies = require('../schemas/companies')
const employees = require('../schemas/employees')
const requests = require('../schemas/requests')
const users = require('../schemas/users')

const userRepo = require('../repositories/user-pgdb')
const roles = require('../models/roles')
const passwords = require('../libs/passwords')

async function main() {
    await requests.sync({ force: true })
    await users.sync({ force: true })
    await companies.sync({ force: true })
    await admins.sync({ force: true })
    await employees.sync({ force: true })

    await userRepo.create({
        username: 'admin',
        password: passwords.hash('admin'),
        role: roles.salaryHero
    })
}

main()