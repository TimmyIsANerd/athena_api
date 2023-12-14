/**
 * Course.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
    },

    description: {
      type: "string",
    },

    courseCardImageURL: {
      type: "string",
      description: "Course Card Image",
    },

    courseCardImagePublicId: {
      type: "string",
    },

    sections: {
      collection: "section",
      via: "course",
    },

    user: {
      model: "user",
    },
  },
};
