const model = require('../../src/models/employees')

describe('employee model', () => {
    const data = model({ firstname: 'test', lastname: 'test', userId: 1, companyId: 1, salary: 30000 })

    test('isAvailableRequest success when amount = 50%', () => {
        expect(data.isAvailableRequest(15000)).toBe(true)
    })

    test('isAvailableRequest success when amount < 50%', () => {
        expect(data.isAvailableRequest(10000)).toBe(true)
    })

    test('isAvailableRequest fail when amount > 50%', () => {
        expect(data.isAvailableRequest(20000)).toBe(false)
    })
})