const { dataTypes } = require('../../src')

describe('src/dataTypes#string', () => {
  const doTest = dataType => {
    describe(`Testing ${dataType}`, () => {
      context('non function', () => {
        it(`supports ${dataType} with BINARY`, () => {
          expect(dataTypes[dataType].BINARY).toBeDefined()
        })
      })

      context('function', () => {
        it(`supports ${dataType}() with BINARY`, () => {
          expect(dataTypes[dataType](10).BINARY).toBeDefined()
        })
      })
    })
  }
  ;['CHAR', 'STRING'].forEach(doTest)
})
