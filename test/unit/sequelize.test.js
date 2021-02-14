const sequelize = require('../../src/sequelize')
const staticMethods = require('../../src/constants/staticMethods')

describe('src/sequelize', () => {
  it('has define', () => {
    expect(sequelize).toHaveProperty('define')
    expect(sequelize.define).toBeInstanceOf(Function)
  })

  staticMethods.forEach(method => {
    it(`has static method ${method}`, () => {
      const fn = sequelize[method]
      expect(fn.constructor.name).toBe('Function')
    })
  })
})
