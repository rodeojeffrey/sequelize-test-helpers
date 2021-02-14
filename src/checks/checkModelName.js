const checkModelName = model => modelName => {
  it(`is named '${modelName}'`, () => {
    expect(model.modelName).toBe(modelName)
  })
}

module.exports = checkModelName
