const Joi = require('joi')
const companies = require('../controllers/companies')
const admins = require('../controllers/admins')
const errors = require('../libs/errors')

const createSchema = Joi.object({
    name: Joi.string().required(),
})

const updateSchema = Joi.object({
    name: Joi.string().required(),
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

        const result = await companies.create(req.body)

        res.json({ result })
    } catch (error) {
        if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else if (error.error) {
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
        const result = await companies.get(req.params.id)
        if (!result) {
            throw errors.companyNotFound
        }

        res.json({ result })

    } catch (error) {
        if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else if (error.error) {
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

        const result = await companies.update({
            id: req.params.id,
            name: req.body.name,
        })

        if (!result) {
            throw errors.cannotUpdateCompany
        }

        res.json({ result })
    } catch (error) {
        if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else if (error.error) {
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
        const result = await companies.delete(req.params.id)
        if (!result) {
            throw errors.cannotDeleteCompany
        }

        return res.json({ message: "Success" })
    } catch (error) {
        if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else if (error.error) {
            res.status(400).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}

const addAdminSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.addAdmin = async (req, res) => {
    try {
        const { error } = addAdminSchema.validate(req.body)
        if (error && error.details.length > 0) {
            throw { error: error.details[0] }
        }

        const company = await companies.get(req.params.id)
        if (!company) {
            throw errors.companyNotFound
        }

        const result = await admins.create({
            ...req.body,
            companyId: company.id,
        })

        res.json({ result })
    } catch (error) {
        if (error.error) {
            res.status(400).json(error)
        } else if (error === errors.companyNotFound) {
            res.status(404).json(error)
        } else {
            res.status(500).json({ error })
        }
    }
}