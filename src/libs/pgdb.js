const { db } = require('../config')
const { Sequelize } = require('sequelize');

const dsn = `postgres://${db.postgres.user}:${db.postgres.pass}@${db.postgres.server}:${db.postgres.port}/${db.postgres.dbname}`

module.exports = {
    db: new Sequelize(dsn)
}