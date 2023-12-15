/**
 * CommunityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: 'CreateCommunity',

  description: 'Create a new community',

  inputs: {
    title: {
      type: 'string',
      required: true,
      description: 'Title of the community',
    },

    description: {
      type: 'string',
      required: true,
      description: 'Description of the community',
    },

    userId: {
      type: 'number',
      required: true,
      description: 'ID of the user creating the community',
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'Successfully created a new community',
    },
    error: {
      responseType: 'serverError',
      description: 'Server error occurred during community creation',
    },
  },

  fn: async function ({ title, description, userId }, exits) {
    try {
      const newCommunity = await Community.create({
        title,
        description,
        user: userId,
      }).fetch();

      if (!newCommunity) {
        return exits.error({
          error: 'Server Error',
          message: 'Failed to create a new community',
        });
      }

      return exits.success({
        message: 'Successfully created a new community',
        community: newCommunity,
      });
    }
    catch (error) {
      return exits.error({
        error: 'Server Error',
        message: 'An error occurred during community creation',
      });
    }
  },
};
