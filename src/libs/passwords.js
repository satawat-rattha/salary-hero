const bcrypt = require('bcrypt')

exports.hash = (password) => {
    return bcrypt.hashSync(password, 10)
}

exports.compare = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}