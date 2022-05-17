'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dislikes extends Model {
    /**
     *Méthode qui gère les associations
     */
    static associate (models) {
      Dislikes.belongsTo(models.User, { foreignKey: 'userId' })
      Dislikes.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Dislikes.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Dislikes'
    }
  )

  Dislikes.afterCreate(async dislike => {
    const post = await like.getPost()
    await post.update({
      dislikesCount: post.dislikesCount + 1
    })
  })
  Dislikes.afterDestroy(async dislike => {
    const post = await dislike.getPost()
    post.update({
      dislikesCount: post.dislikesCount - 1
    })
  })

  Dislikes.afterCreate(async dislike => {
    const post = await dislike.getPost()
    const user = await dislike.getUser()

    if (user.id == post.userId) return
  })

  return Dislikes
}
