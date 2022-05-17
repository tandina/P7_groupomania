'use strict'
const { Model } = require('sequelize')

const {
  addAuthentication
} = require('../middleware/authentication')

const { deleteFile } = require('../middleware/delete-file')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Post, { foreignKey: 'userId' })
    }

    softDestroy () {
      return this.update({
        deleted: true,
        email: `${this.email}`,
        imageUrl: null,
        firstName: `${this.firstName}`,
        lastName: `${this.lastName}`
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          async ensureEmailIsUnique (email) {
            if (await User.findOne({ where: { email } }))
              throw new Error('Compte existant!')
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  addAuthentication(User)

  User.afterUpdate(async user => {
    if (user.dataValues.imageUrl !== user._previousDataValues.imageUrl) {
      deleteFile(user._previousDataValues.imageUrl)
    }
  })

  return User
}
