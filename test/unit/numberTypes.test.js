const { dataTypes } = require('../../src')

describe('src/dataTypes#numeric', () => {
  const doTest = dataType => {
    describe(`Testing ${dataType}`, () => {
      context('non function', () => {
        it(`supports ${dataType} with ZEROFILL`, () => {
          expect(dataTypes[dataType].ZEROFILL).toBeDefined()
        })

        it(`supports ${dataType} with UNSIGNED`, () => {
          expect(dataTypes[dataType](10).UNSIGNED).toBeDefined()
        })

        it(`supports ${dataType} with UNSIGNED.ZEROFILL`, () => {
          expect(dataTypes[dataType].UNSIGNED.ZEROFILL).toBeDefined()
        })

        it(`supports ${dataType} with ZEROFILL.UNSIGNED`, () => {
          expect(dataTypes[dataType].ZEROFILL.UNSIGNED).toBeDefined()
        })
      })

      context('function', () => {
        it(`supports ${dataType}() with ZEROFILL`, () => {
          expect(dataTypes[dataType](10).ZEROFILL).toBeDefined()
        })

        it(`supports ${dataType}() with UNSIGNED`, () => {
          expect(dataTypes[dataType](10).UNSIGNED).toBeDefined()
        })

        it(`supports ${dataType}() with UNSIGNED.ZEROFILL`, () => {
          expect(dataTypes[dataType](10).UNSIGNED.ZEROFILL).toBeDefined()
        })

        it(`supports ${dataType}() with ZEROFILL.UNSIGNED`, () => {
          expect(dataTypes[dataType](10).ZEROFILL.UNSIGNED).toBeDefined()
        })
      })
    })
  }
  ;[
    'BIGINT',
    'DECIMAL',
    'DOUBLE',
    'DOUBLE PRECISION',
    'FLOAT',
    'INTEGER',
    'REAL',
    'SMALLINT',
    'TINYINT'
  ].forEach(doTest)
})
