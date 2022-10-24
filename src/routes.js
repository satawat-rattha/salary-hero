const express = require('express')
const router = express.Router()
const companies = require('./handlers/companies')
const employees = require('./handlers/employees')
const admins = require('./handlers/admins')
const requests = require('./handlers/requests')

router.get('/companies/:id', companies.get)
router.post('/companies/create', companies.create)
router.post('/companies/:id/add-admin', companies.addAdmin)
router.post('/companies/:id/update', companies.update)
router.post('/companies/:id/delete', companies.delete)

router.get('/admins/:id', admins.get)
router.post('/admins/create', admins.create)
router.post('/admins/:id/update', admins.update)
router.post('/admins/:id/delete', admins.delete)

router.get('/employees/:id', employees.get)
router.post('/employees/import', employees.import)
router.post('/employees/create', employees.create)
router.post('/employees/:id/update', employees.update)
router.post('/employees/:id/delete', employees.delete)

router.post('/requests', requests.create)

module.exports = router