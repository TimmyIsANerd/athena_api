/**
 * CommentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // POST /api/community/comments/:forumId
  postComment: async (req, res) => {
    try {
      const { content, forumId } = req.body;
      const userId = req.session.user.id; // Assume user session for logged-in user

      const comment = await Comment.create({
        content,
        forumId,
        userId,
      }).fetch();

      res.json(comment);
    } catch (error) {
      res.serverError(error);
    }
  },

  // POST /api/community/comments/reply/:commentId
  postReply: async (req, res) => {
    try {
      const { content, commentId } = req.body;
      const userId = req.session.user.id; // Assume user session for logged-in user

      const parentComment = await Comment.findOne({ id: commentId });
      if (!parentComment) {
        return res.status(404).json({
          message: 'Parent comment not found',
          error: 'The specified parent comment was not found.',
        });
      }

      const comment = await Comment.create({
        content,
        forumId: parentComment.forumId,
        userId,
        replyTo: commentId,
      }).fetch();

      res.json(comment);
    } catch (error) {
      res.serverError(error);
    }
  },

  // PUT /api/community/comments/:id
  updateComment: async (req, res) => {
    try {
      const { id, content } = req.body;
      const updatedComment = await Comment.updateOne({ id })
        .set({ content })
        .catch((error) => {
          throw error;
        });

      if (!updatedComment) {
        return res.status(404).json({
          message: 'Comment not found',
          error: 'The specified comment was not found.',
        });
      }

      res.json(updatedComment);
    } catch (error) {
      res.serverError(error);
    }
  },

  // DELETE /api/community/comments/:id
  deleteComment: async (req, res) => {
    try {
      const { id } = req.body;
      const deletedComment = await Comment.destroyOne({ id })
        .catch((error) => {
          throw error;
        });

      if (!deletedComment) {
        return res.status(404).json({
          message: 'Comment not found',
          error: 'The specified comment was not found.',
        });
      }

      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.serverError(error);
    }
  },
};
