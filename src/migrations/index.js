const admins = require('../schemas/admins')
const companies = require('../schemas/companies')
const employees = require('../schemas/employees')
const requests = require('../schemas/requests')
const users = require('../schemas/users')

async function main() {
    await requests.sync({ force: true })
    await users.sync({ force: true })
    await companies.sync({ force: true })
    await admins.sync({ force: true })
    await employees.sync({ force: true })
}

main()