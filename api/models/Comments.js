/**
 * Comment.js
 *
 * @description :: A model definition representing a database table/collection for comments.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    content: {
      type: 'string',
      required: true,
      description: 'Content of the comment',
    },
    forum: {
      model: 'Forum',
      via: 'comments',
      description: 'Link to the forum where the comment is posted',
    },
    user: {
      model: 'User',
      description: 'User who posted the comment',
    },
  //   // replyTo: {
  //     model: 'Comment',
  //     description: 'ID of the comment being replied to',
  //   },
  },
};
