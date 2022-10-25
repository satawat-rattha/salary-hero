const jwt = require('jsonwebtoken')
const Joi = require("joi");
// const auth = require('../controllers/auth')
const passport = require('../libs/passport')
const config = require('../config')

// const loginSchema = Joi.object({
//     username: Joi.string().required(),
//     password: Joi.string().required(),
// })

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occured.')
                console.log(err)

                if (err === null) {
                    res.status(401).json({ message: 'invalid username or password.' })
                }
                return next(error)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)

                const token = jwt.sign({ user: { ...user, password: undefined } }, config.jwt.secret, {
                    algorithm: 'HS256',
                    expiresIn: config.jwt.accessExpire,
                })

                res.json({ ...user, token, password: undefined })
            })

        } catch (error) {
            console.error(error)
            return next(error)
        }
    })(req, res, next)
}