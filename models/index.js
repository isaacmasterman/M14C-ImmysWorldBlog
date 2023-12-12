const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User-Post Associations
User.hasMany(Post, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, { 
    foreignKey: 'userId'
});

// Post-Comment Associations
Post.hasMany(Comment, { 
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, { 
    foreignKey: 'postId'
});

// User-Comment Associations
User.hasMany(Comment, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, { 
    foreignKey: 'userId'
});

module.exports = { User, Post, Comment };
