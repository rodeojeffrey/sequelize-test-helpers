const { sequelize, dataTypes, checkUniqueIndex } = require('../../../src')
const IndexedModel = require('../../models/Indexed')

describe('src/checkUniqueIndex', () => {
  const Model = IndexedModel(sequelize, dataTypes)
  const instance = new Model()

  describe('happy path', () => {
    ;['uuid'].forEach(checkUniqueIndex(instance))
  })

  describe('unhappy path', () => {
    it('fails the test', () => {
      try {
        checkUniqueIndex(instance)('no such index')
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })
  })
})
