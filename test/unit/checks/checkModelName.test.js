const { sequelize, dataTypes, checkModelName } = require('../../../src')
const SimpleModel = require('../../models/Simple')

describe('src/checkModelName', () => {
  const Model = SimpleModel(sequelize, dataTypes)
  describe('happy path', () => {
    checkModelName(Model)('Simple')
  })

  describe('unhappy path', () => {
    it('fails the test', () => {
      try {
        checkModelName(Model)('Not So Simple')
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })
  })
})