/**
 * Community.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      type: 'string',
      required: true,
    },

    courseId: {
      type: 'string',
      required: true,
    },

    pagesRead: {
      type: 'number',
      defaultsTo: 0,
    },

    videosWatched: {
      type: 'number',
      defaultsTo: 0,
    },
  },
};
