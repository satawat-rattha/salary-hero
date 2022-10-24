const bcrypt = require('bcrypt')

module.exports = ({ id = null, username, password, role }) => {
    if (!username) {
        throw new 'username is require'
    }

    if (!password) {
        throw new 'password is require'
    }

    if (!role) {
        throw new 'role is require'
    }

    return {
        id: id ? Number(id) : id,
        username,
        password,
        role: Number(role),
        isRole(role) {
            return this.role === role
        },
        setRole(role) {
            this.role = role
        },
        setPassword(password) {
            this.password = bcrypt.hashSync(password, 10)
        },
        comparePassword(password) {
            return bcrypt.compareSync(password, this.password)
        }
    }
}