![Horizontal Logo](logo/horizontal.svg)

A collection of utilities to help with unit-testing [Sequelize](http://docs.sequelizejs.com) models and code that needs those models. 
This project uses jest and it's a fork of this [project](https://github.com/davesag/sequelize-test-helpers)
Thanks to [Dave](https://github.com/davesag) Give him some love.



### Prerequisites

This library assumes:

1. You are using [`jest`](https://jestjs.io)

### Installation

Add `sequelize-jest-helpers` as a `devDependency`:

```sh
npm i -D sequelize-test-helpers
```

## Examples

### Unit testing models created with `sequelize.define`

**Note**: See below for how to test models created using `Model.init`

Let's say you have a Sequelize model `User` as follows:

#### `src/models/User.js`

```js
const model = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      age: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      token: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      indexes: [
        { unique: true, fields: ['email'] },
        { unique: true, fields: ['token'] }
      ]
    }
  )

  User.associate = ({ Company }) => {
    User.belongsTo(Company)
  }

  return User
}

module.exports = model
```

You can use `sequelize-test-helpers` to unit-test this with `mocha` as follows:

#### `test/unit/models/User.spec.js`

```js
const { expect } = require('chai')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

const UserModel = require('../../src/models/User')

describe('src/models/User', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()

  checkModelName(User)('User')

  context('properties', () => {
    ;['age', 'firstname', 'lastname', 'email', 'token'].forEach(checkPropertyExists(user))
  })

  context('associations', () => {
    const Company = 'some dummy company'

    before(() => {
      User.associate({ Company })
    })

    it('defined a belongsTo association with Company', () => {
      expect(User.belongsTo).to.have.been.calledWith(Company)
    })
  })

  context('indexes', () => {
    ;['email', 'token'].forEach(checkUniqueIndex(user))
  })
})
```

### Built-in checks

| Check                      | What it does                                             |
| -------------------------- | -------------------------------------------------------- |
| `checkHookDefined`         | Checks that a particular hook is defined.                |
| `checkModelName`           | Checks that the model is named correctly.                |
| `checkNonUniqueIndex`      | Checks that a specific non-unique index is defined.      |
| `checkPropertyExists`      | Checks that the model has defined the given property.    |
| `checkUniqueCompoundIndex` | Checks that a specific unique compound index is defined. |
| `checkUniqueIndex`         | Checks that a specific unique index is defined.          |

### Checking associations

The various association functions are stubbed so you can simply invoke the the model's `associate` function in a `before` block then use `sinon`'s standard expectation syntax to check they were called with the correct values.

#### `hasOne`

```js
it("defined a hasOne association with Image as 'profilePic'", () => {
  expect(User.hasOne).to.have.been.calledWith(Image, {
    as: 'profilePic'
  })
})
```

#### `belongsTo`

```js
it('defined a belongsTo association with Company', () => {
  expect(User.belongsTo).to.have.been.calledWith(Company)
})
```

#### `hasMany`

```js
it("defined a hasMany association with User as 'employees'", () => {
  expect(Company.hasMany).to.have.been.calledWith(User, {
    as: 'employees'
  })
})
```

#### `belongsToMany`

```js
it("defined a belongsToMany association with Category through CategoriesCompanies as 'categories'", () => {
  expect(Company.belongsToMany).to.have.been.calledWith(Category, {
    through: CategoriesCompanies,
    as: 'categories'
  })
})
```

### Unit testing code that requires `models`

Let's say you have a utility function that takes some data and uses it to update a user record. If the user does not exist it returns `null`. (Yes I know this is a contrived example)

#### `src/utils/save.js`

```js
const { User } = require('../models')

const save = async ({ id, ...data }) => {
  const user = await User.findOne({ where: { id } })
  if (user) return await user.update(data)
  return null
}

module.exports = save
```

As a convenience, `makeMockModels` will automatically populate your `mockModels` with mocks of all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `model-path` in that). Simply override any of the specific models you need to do stuff with.

### Testing models created with `Model.init`

Sequelize also allows you to create models by extending `Sequelize.Model` and invoking its static `init` function as follows:

**Note**: creating your models this way makes it harder to test their use.

```js
const { Model, DataTypes } = require('sequelize')

const factory = sequelize => {
  class User extends Model {}
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    { sequelize, modelName: 'User' }
  )
  return User
}

module.exports = factory
```

### Listing your models

Assuming your `src/models/index.js` (or your equivalent) exports all your models, it's useful to be able to generate a list of their names.

```js
const { listModels } = require('sequelize-test-helpers')

console.log(listModels()) // will spit out a list of your model names.
```

Similarly to `makeMockModels` above, `listModels` will find all of the models defined in your `src/models` folder (or if you have a `.sequelizerc` file it will look for the `model-path` in that).

## Custom `models` paths and custom file suffixes

By default `makeMockModels` and `listModels` will both look for your models in files ending with `.js` in either the models path defined in `.sequelizerc`, or in `src/models`. If however your models are not `.js` files and the `models` folder is somewhere else you can pass in a custom models folder path and a custom suffix.

- `listModels(customModelsFolder, customSuffix)`

  ```js
  const modelNames = listModels('models', '.ts')
  ```

- `makeMockModels(yourCustomModels, customModelsFolder, customSuffix)`

  ```js
  const models = makeMockModels({ User: { findOne: stub() } }, 'models', '.ts')
  ```

## Development

### Branches

<!-- prettier-ignore -->
| Branch | Status | Coverage | Audit | Notes |
| ------ | ------ | -------- | ----- | ----- |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/sequelize-test-helpers/tree/master) | [![codecov](https://codecov.io/gh/davesag/sequelize-test-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/sequelize-test-helpers) | [![Vulnerabilities](https://snyk.io/test/github/davesag/sequelize-test-helpers/master/badge.svg)](https://snyk.io/test/github/davesag/sequelize-test-helpers/master) | Latest stable release |

### Prerequisites

- [NodeJS](htps://nodejs.org). I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.

### Initialisation

```sh
npm install
```

### Test it

- `npm test` — runs the unit tests
- `npm run test:unit:cov` — runs the unit tests with code coverage

### Lint it

```sh
npm run lint
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## Thanks

- Thanks to [`reallinfo`](https://github.com/reallinfo) for the logo.
