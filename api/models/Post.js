/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    author: {
      type: "json",
      description: "Author Profile",
    },

    text: {
      type: "string",
      description: "Post Content",
    },

    noOfLikes: {
      type: "number",
      description: "No of Post Likes",
    },

    noOfDislikes: {
      type: "number",
      description: "No of Post Dislikes",
    },

    userLikes: {
      type: "json",
      description: "List of Users that like post",
    },

    userDislike: {
      type: "json",
      description: "List of Users that dislike post",
    },

    community: {
      model: "community",
    },
  },
};
