/**
 * Forum.js
 *
 * @description :: A model definition representing a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      description: 'Name of the forum',
    },
    description: {
      type: 'string',
      description: 'Forum inquiry or description',
    },
    communityId: {
      model: 'Community',
      description: 'Link to the community',
    },
    creatorId: {
      model: 'User',
      description: 'ID of the user who created the forum (tutor or student)',
    },
    type: {
      type: 'string',
      isIn: ['tutor', 'student'],
      description: 'Forum type (tutor-led or student-created)',
    },
    community: {
      model: 'Community',
      via: 'forum',
    },
    comments: {
      collection: 'Comments',
      via: 'forum',
      description: 'One-to-many relationship with comments',
    },
    user: {
      collection: 'user',
      via: 'Forum',
    },
  },
};
