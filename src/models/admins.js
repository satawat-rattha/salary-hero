const roles = require("./roles")

module.exports = ({ id = null, username, password, companyId }) => {
    if (!companyId) {
        throw new 'companyId is require'
    }

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
        role: roles.admin,
        companyId: Number(companyId),
    }
}