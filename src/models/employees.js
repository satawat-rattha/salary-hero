module.exports = ({ id = null, firstname, lastname, userId, companyId, salary = 0 }) => {
    if (!companyId) {
        throw 'companyId is require'
    }

    if (!firstname) {
        throw 'firstname is require'
    }

    if (!lastname) {
        throw 'lastname is require'
    }

    if (!userId) {
        throw 'lastname is require'
    }

    return {
        id: id ? Number(id) : id,
        firstname,
        lastname,
        userId,
        salary: salary && salary >= 0 ? Number(salary) : 0,
        companyId: Number(companyId),
        isAvailableRequest(amount) {
            return this.salary / amount >= 2
        }
    }
}