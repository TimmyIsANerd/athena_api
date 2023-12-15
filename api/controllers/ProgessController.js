/**
 * CommunityController
 *
 * @description :: Server-side actions for handling community-related requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const CommunityService = require('../services/CommunityService');

module.exports = {
  updateProgess: async (req, res) => {
    try {
      const {courseId} = req.params;
      const {pageId, videoId, watchedDuration} = req.body;
      const userId = req.session.user.Id;

      await ProgressService.updateProgess(userId, courseId, pageId, videoId, watchedDuration);

      return res.json({message: 'Progess updated successfully'});
    }
    catch (error) {
      return res.serverError(error);
    }
  },

  getUserProgess: async (req, res) => {
    try {
      const {courseId} = req.params;
      const userId = req.session.user.id;

      const userProgess = await ProgressService.getUserProgess(userId, courseId);

      return res.json(userProgess);
    }
    catch (error) {
      return res.serverError(error);
    }
  },
};
