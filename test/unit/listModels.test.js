const { listModels } = require('../../src')

describe('src/listModels', () => {
  const expected = ['HasHooks', 'Indexed', 'Simple']
  context('default suffix', () => {
    const models = listModels('test/models')

    it('lists the models', () => {
      expect(models).toEqual(expected)
    })
  })

  context('custom suffix', () => {
    const models = listModels('test/models', '.js')

    it('lists the models', () => {
      expect(models).toEqual(expected)
    })
  })
})
