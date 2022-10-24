module.exports = ({ id = null, companyId, userId }) => {
    if (!companyId) {
        throw new 'companyId is require'
    }

    if (!userId) {
        throw new 'userId is require'
    }

    return {
        id: id ? Number(id) : id,
        userId: Number(userId),
        companyId: Number(companyId),
    }
}