const { Sequelize } = require('sequelize');

module.exports = {
    db: new Sequelize('postgres://postgres:example@localhost:5432/salary-hero') // Example for postgres      ,
}