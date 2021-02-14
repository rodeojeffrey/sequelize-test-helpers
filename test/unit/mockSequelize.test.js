const Sequelize = require('../../src/mockSequelize')
const DataTypes = require('../../src/dataTypes')

describe('src/mockSequelize', () => {
  it('has Model', () => {
    expect(Sequelize).toHaveProperty('Model')
  })

  it('Model is a class', () => {
    expect(Sequelize.Model).toBeInstanceOf(Function)
    expect(Sequelize.Model.constructor).toBeInstanceOf(Function)
  })

  it('Model has a static init function', () => {
    expect(Sequelize.Model.init).toBeInstanceOf(Function)
  })

  it('has DataTypes', () => {
    expect(Sequelize).toHaveProperty('DataTypes', DataTypes)
  })
})
