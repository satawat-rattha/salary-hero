const bcrypt = require('bcrypt')
const roles = require('./roles')

module.exports = ({ id = null, username, password }) => {
    if (!username) {
        throw new 'username is require'
    }

    if (!password) {
        throw new 'password is require'
    }

    return {
        id: id ? Number(id) : id,
        username,
        password,
        role: roles.salaryHero
    }
}