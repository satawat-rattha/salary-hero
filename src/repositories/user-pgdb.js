const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')
const model = require('../models/users')

const Schema = db.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'users',
    timestamps: true,

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