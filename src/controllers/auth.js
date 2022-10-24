const userRepo = require('../repositories/user-pgdb')
const passwords = require('../libs/passwords')
const errors = require('../libs/errors')

const roles = ['Guest', 'Salary-Hero', 'Admin', 'Employee']

module.exports = {
    async login(username, password) {
        const user = await userRepo.getByUsername(username)
        if (!user) {
            throw errors.userNotFound
        }

        if (!passwords.compare(password, user.password)) {
            throw errors.authenticationFail
        }

        return {
            id: user.id,
            username: user.username,
            role: roles[user.role],
            token: '',
        }
    }
}