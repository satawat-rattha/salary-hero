const roles = require("./roles")

module.exports = ({ id, firstname, lastname, username, password, companyId, salary = 0 }) => {
    if (!id) {
        throw 'id is require'
    }

    if (!companyId) {
        throw 'companyId is require'
    }

    if (!firstname) {
        throw 'firstname is require'
    }

    if (!lastname) {
        throw 'lastname is require'
    }

    if (!username) {
        throw 'username is require'
    }

    if (!password) {
        throw 'password is require'
    }

    return {
        id: id,
        firstname,
        lastname,
        username,
        password,
        salary: salary && salary >= 0 ? Number(salary) : 0,
        companyId: Number(companyId),
        role: roles.employee,
        isAvailableRequest(amount) {
            return this.salary / amount >= 2
        }
    }
}