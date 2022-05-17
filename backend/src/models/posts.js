'use strict'
const { Model } = require('sequelize')

const moment = require('moment')

const { deleteFile } = require('../middleware/delete-file')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Méthode pour gérer les assoications.
     */
    static associate (models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Comments)
    }

    readableCreatedAt () {
      return moment(this.createdAt)
        .locale('fr')
        .format('LL')
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      likesCount: DataTypes.INTEGER,
      dislikesCount: DataTypes.INTEGER

    },
    {
      sequelize,
      validate: {
        eitherContentOrImageUrl () {
          if (!this.content && !this.imageUrl) {
            throw new Error('Vous ne pouvez pas créer de publication vide !')
          }
        }
      },
      modelName: 'Post'
    }
  )

  Post.afterDestroy(async post => {
    if (post.imageUrl) {
      deleteFile(post.imageUrl)
    }
  })

  Post.afterUpdate(async post => {
    if (post.dataValues.imageUrl !== post._previousDataValues.imageUrl) {
      await deleteFile(post._previousDataValues.imageUrl)
    }
  })

  return Post
}
