/**
 * Community.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      description: 'Title of Community',
    },

    description: {
      type: 'string',
      required: true,
      description: 'Description of Community',
    },

    posts:{
      collection:'post',
      via:'community'
    },

    user:{
      model:'user'
    }
  },
};
