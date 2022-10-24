const express = require('express')
const router = express.Router()
const companies = require('./handlers/companies')
const employees = require('./handlers/employees')
const admins = require('./handlers/admins')
const requests = require('./handlers/requests')
const auth = require('./handlers/auth')
const roleMiddleware = require('./middleware/role-middleware')
const roles = require('./models/roles')

router.post('/login', auth.login)

router.get('/companies/:id', roleMiddleware(roles.salaryHero), companies.get)
router.post('/companies/create', roleMiddleware(roles.salaryHero), companies.create)
router.post('/companies/:id/add-admin', roleMiddleware(roles.salaryHero), companies.addAdmin)
router.post('/companies/:id/update', roleMiddleware(roles.salaryHero), companies.update)
router.post('/companies/:id/delete', roleMiddleware(roles.salaryHero), companies.delete)

router.get('/admins/:id', roleMiddleware(roles.salaryHero), admins.get)
router.post('/admins/create', roleMiddleware(roles.salaryHero), admins.create)
router.post('/admins/:id/update', roleMiddleware(roles.salaryHero), admins.update)
router.post('/admins/:id/delete', roleMiddleware(roles.salaryHero), admins.delete)

router.get('/employees/:id', roleMiddleware(roles.admin), employees.get)
router.post('/employees/import', roleMiddleware(roles.admin), employees.import)
router.post('/employees/create', roleMiddleware(roles.admin), employees.create)
router.post('/employees/:id/update', roleMiddleware(roles.admin), employees.update)
router.post('/employees/:id/delete', roleMiddleware(roles.admin), employees.delete)

router.post('/requests', roleMiddleware(roles.employee), requests.create)

module.exports = router