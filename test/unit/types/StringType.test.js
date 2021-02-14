const StringType = require('../../../src/types/StringType')

describe('src/types/StringType', () => {
  it('is a function', () => {
    expect(StringType).toBeInstanceOf(Function)
  })

  it('returns itself', () => {
    expect(StringType()).toBe(StringType)
  })

  it('has property BINARY', () => {
    expect(StringType).toHaveProperty('BINARY', StringType)
  })
})
