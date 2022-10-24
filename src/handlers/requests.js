const Joi = require('joi')
const employees = require('../controllers/requests')

const createSchema = Joi.object({
    employeeId: Joi.number().required(),
    amount: Joi.number().required(),
})

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.create = async (req, res) => {
    try {
        const { error } = createSchema.validate(req.body)
        if (error && error.details.length > 0) {
            throw { error: error.details[0] }
        }

        const result = await employees.create(req.body)

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}