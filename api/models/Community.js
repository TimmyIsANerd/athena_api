/**
 * Community.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      description: 'Name of the community',
    },
    description: {
      type: 'string',
      description: 'Description of the community',
    },
    tutorId: {
      model: 'User',
      description: 'Link to the tutor account',
    },
    forums: {
      collection: 'Forum',
      via: 'community',
      description: 'One-to-many relationship with forums',
    },
    posts: {
      collection: 'Post',
      via: 'community',
      description: 'One-to-many relationship with posts',
    },
    user: {
      model: 'User',
      description: 'User associated with the community',
    },
  },
};
