module.exports = ({ id = null, employeeId, companyId, requestedDate, amount }) => {
    if (!employeeId) {
        throw new 'employeeId is require'
    }

    if (!companyId) {
        throw new 'companyId is require'
    }

    return {
        id: id ? Number(id) : id,
        employeeId: Number(employeeId),
        companyId: Number(companyId),
        requestedDate: requestedDate ? Date(requestedDate) : null,
        amount: amount && amount >= 0 ? Number(amount) : 0,
    }
}