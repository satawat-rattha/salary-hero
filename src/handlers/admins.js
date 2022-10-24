const Joi = require('joi')
const admins = require('../controllers/admins')
const errors = require('../libs/errors')

const createSchema = Joi.object({
    companyId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const updateSchema = Joi.object({
    companyId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
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

        const result = await admins.create(req.body)

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.get = async (req, res) => {
    try {
        const result = await admins.get(req.params.id)
        if (!result) {
            throw errors.adminNotFound
        }

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.update = async (req, res) => {
    try {
        const { error } = updateSchema.validate(req.body)
        if (error && error.details.length > 0) {
            throw { error: error.details[0] }
        }

        const result = await admins.update({
            id: req.params.id,
            name: req.body.name,
        })

        if (!result) {
            throw errors.cannotUpdateAdmin
        }

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.delete = async (req, res) => {
    try {
        const result = await admins.delete(req.params.id)
        if (!result) {
            throw errors.cannotDeleteAdmin
        }

        res.json({ message: "Success" })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}