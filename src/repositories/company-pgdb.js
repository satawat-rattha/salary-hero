const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')
const model = require('../models/companies')

const Schema = db.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'companies',
    timestamps: false,

})

module.exports = {
    Schema,
    async create(data = model()) {
        const result = await Schema.create(data)
        return model(result.get())
    },
    async update(id, data = model()) {
        const result = await Schema.update(data, { where: { id } })
        if (!result[0]) {
            return null
        }

        return model(data)
    },
    async get(id) {
        const result = await Schema.findByPk(id)
        if (!result) {
            return null
        }

        return model(result.get())
    },
    async delete(id) {
        const result = await Schema.destroy({ where: { id } })
        if (!result) {
            return false
        }
        return true
    }
}