/**
 * Certificate.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true,
    },
    course: {
      model: 'course',
      required: true,
    },
    path: {
      type: 'string',
      required: true,
    },
    createdAt: { type: 'string', autoCreatedAt: true },
    updatedAt: { type: 'string', autoUpdatedAt: true },
  },
};
