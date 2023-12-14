/**
 * Section.js
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

    mediaFiles:{
      collection:'media',
      via:"section"
    },
    
    course: {
      model: "course",
    },
  },
};
