const Joi = require("joi");
const auth = require('../controllers/auth')

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error && error.details.length > 0) {
            throw { error: error.details[0] }
        }

        const result = await auth.login(req.body.username, req.body.password)

        res.json({ result })
    } catch (error) {
        console.error(error)
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}