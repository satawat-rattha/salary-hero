const express = require('express')
const router = express.Router()
const companies = require('./handlers/companies')
const employees = require('./handlers/employees')
const authMiddleware = require('./middleware/auth-middleware')
const admins = require('./handlers/admins')
const requests = require('./handlers/requests')
const auth = require('./handlers/auth')
const roleMiddleware = require('./middleware/role-middleware')
const roles = require('./models/roles')

router.post('/login', auth.login)

router.get('/companies/:id', authMiddleware, roleMiddleware([roles.salaryHero]), companies.get)
router.post('/companies/create', authMiddleware, roleMiddleware([roles.salaryHero]), companies.create)
router.post('/companies/:id/add-admin', authMiddleware, roleMiddleware([roles.salaryHero]), companies.addAdmin)
router.post('/companies/:id/update', authMiddleware, roleMiddleware([roles.salaryHero]), companies.update)
router.post('/companies/:id/delete', authMiddleware, roleMiddleware([roles.salaryHero]), companies.delete)

router.get('/admins/:id', authMiddleware, roleMiddleware([roles.salaryHero]), admins.get)
router.post('/admins/create', authMiddleware, roleMiddleware([roles.salaryHero]), admins.create)
router.post('/admins/:id/update', authMiddleware, roleMiddleware([roles.salaryHero]), admins.update)
router.post('/admins/:id/delete', authMiddleware, roleMiddleware([roles.salaryHero]), admins.delete)

router.get('/employees/:id', authMiddleware, roleMiddleware([roles.admin]), employees.get)
router.post('/employees/import', authMiddleware, roleMiddleware([roles.admin]), employees.import)
router.post('/employees/create', authMiddleware, roleMiddleware([roles.admin]), employees.create)
router.post('/employees/:id/update', authMiddleware, roleMiddleware([roles.admin]), employees.update)
router.post('/employees/:id/delete', authMiddleware, roleMiddleware([roles.admin]), employees.delete)

router.post('/requests', authMiddleware, roleMiddleware([roles.employee]), requests.create)

module.exports = router