const Noop = require('../../../src/types/Noop')

describe('src/types/Noop', () => {
  it('is a function', () => {
    expect(Noop).toBeInstanceOf(Function)
  })

  it('returns itself', () => {
    expect(Noop()).toBe(Noop)
  })
})
