/**
 * CommentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: 'Comment',

  description: 'Post a Comment',

  inputs: {
    content: {
      type: 'string',
      required: true,
      description: 'Content of the comment',
    },

    forumId: {
      type: 'string',
      required: true,
      description: 'ID of the forum where the comment is posted',
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'Successfully posted a comment',
    },
    invalid: {
      responseType: 'badRequest',
      statusCode: 400,
      description:
        'The provided content and/or forum ID are invalid or missing.',
    },
    forumNotFound: {
      statusCode: 404,
      description: 'The specified forum was not found.',
    },
  },

  fn: async function ({ content, forumId }, exits) {
    const { res } = this;

    if (!content || !forumId) {
      return res.status(400).json({
        message: 'Bad Request',
        error: 'Content and forumId are required fields',
      });
    }

    try {
      const forum = await Forum.findOne({ id: forumId });
      if (!forum) {
        return res.status(404).json({
          message: 'Forum not found',
          error: 'The specified forum was not found.',
        });
      }

      const newComment = await Comment.create({
        content,
        forum: forumId,
      }).fetch();

      if (!newComment) {
        return res.status(500).json({
          error: 'Server Error',
          message: 'Failed to create a new comment',
        });
      }

      return exits.success({
        message: 'Successfully posted a new comment',
        comment: newComment,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
