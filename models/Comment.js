const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // Unique identifier for the comment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    // Comment content
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true // Ensure that the comment is not empty
      }
    },
    // User ID who created the comment
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // Post ID that the comment is associated with
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true, // Enables createdAt and updatedAt fields
    freezeTableName: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
