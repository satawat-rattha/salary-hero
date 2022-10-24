const Joi = require('joi')
const employees = require('../controllers/employees')
const errors = require('../libs/errors')

const createSchema = Joi.object({
    citizenId: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    companyId: Joi.number().required(),
    salary: Joi.number().required(),
})

const updateSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    companyId: Joi.number().required(),
    salary: Joi.number().required(),
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

        const result = await employees.create({
            ...req.body,
            id: req.body.citizenId,
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

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.get = async (req, res) => {
    try {
        const result = await employees.get(req.params.id)
        if (!result) {
            throw errors.employeeNotFound
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

        const result = await employees.update({
            ...req.body.data,
            id: req.params.id,
        })

        if (!result) {
            throw errors.cannotUpdateEmployee
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
        const result = await employees.delete(req.params.id)
        if (!result) {
            throw errors.cannotDeleteEmployee
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

const importSchema = Joi.object({
    companyId: Joi.number().required(),
    data: Joi.array().items(
        Joi.object({
            citizenId: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            password: Joi.string().required(),
            salary: Joi.number().required(),
        })
    ).required()
})

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.import = async (req, res) => {
    try {
        const { error } = importSchema.validate(req.body)
        if (error && error.details.length > 0) {
            throw { error: error.details[0] }
        }

        const result = await employees.import(req.body.companyId, req.body.data)
        if (!result) {
            throw errors.cannotImportEmployees
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