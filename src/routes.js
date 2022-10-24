const express = require('express')
const router = express.Router()
const companies = require('./handlers/companies')

router.post('/companies', companies.create)
router.put('/companies/:id', companies.update)
router.delete('/companies/:id', companies.delete)
router.get('/companies/:id', companies.get)

module.exports = router