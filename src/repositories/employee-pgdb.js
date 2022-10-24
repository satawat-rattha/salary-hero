const { db } = require('../libs/pgdb')
const { DataTypes, } = require('sequelize')
const model = require('../models/employees')

const Schema = db.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    salary: {
        type: DataTypes.NUMBER,
    },
    companyId: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'employees',
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
        return data
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
    },
    async import(data = [model()]) {
        const result = await Schema.bulkCreate(data, {
            updateOnDuplicate: ['id']
        })
        if (result.length == 0) {
            return null
        }

        return result.map(d => model(d.get()))

    }
}