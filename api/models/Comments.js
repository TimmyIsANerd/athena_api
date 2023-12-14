/**
 * Comments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    text: {
      type: "string",
      description: "Comment",
    },
    author: {
      type: "json",
      description: "Author Profile",
    },
  },
};
