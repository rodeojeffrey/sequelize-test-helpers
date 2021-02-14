const checkHookDefined = instance => hookName => {
  it(`defined a ${hookName} hook`, () => {
    expect(instance.hooks[hookName]).toBeInstanceOf(Function)
  })
}

module.exports = checkHookDefined
