module.exports = ({ id = null, name }) => {
    if (!name) {
        throw new 'name is require'
    }

    return {
        id: id ? Number(id) : id,
        name,
    }
}