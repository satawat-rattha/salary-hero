const Joi = require('joi')
const requests = require('../controllers/requests')

const createSchema = Joi.object({
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

        const result = await requests.create({
            userId: req.user.id,
            amount: req.body.amount,
        })

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}