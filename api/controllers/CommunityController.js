/**
 * CommunityController
 *
 * @description :: Server-side actions for handling community-related requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const CommunityService = require('../services/CommunityService');


module.exports = {
  // GET /api/community
  getCommunities: async (req, res) => {
    try {
      const communities = await Community.find({}).populate('forums');
      return res.json(communities);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // POST /api/community/tutors
  createTutorCommunity: async (req, res) => {
    try {
      const { name, description } = req.body;
      const tutorId = req.session.user.id;

      const community = await Community.create({ name, description, tutorId }).fetch();
      return res.json(community);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // POST /api/community/students
  createStudentForum: async (req, res) => {
    try {
      const { name, description, communityId } = req.body;
      const studentId = req.session.user.id;

      const forum = await Forum.create({
        name,
        description,
        communityId,
        creatorId: studentId,
        type: 'student',
      }).fetch();
      return res.json(forum);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // PUT /api/community/:id
  updateCommunity: async (req, res) => {
    try {
      const { id, name, description } = req.body;
      const updatedCommunity = await Community.updateOne({ id })
        .set({ name, description });

      if (!updatedCommunity) {
        return res.notFound({ message: 'Community not found' });
      }

      return res.json(updatedCommunity);
    } catch (error) {
      return res.serverError(error);
    }
  },

  // DELETE /api/community/:id
  deleteCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCommunity = await Community.destroyOne({ id });

      if (!deletedCommunity) {
        return res.notFound({ message: 'Community not found' });
      }

      return res.json({ message: 'Community deleted successfully' });
    } catch (error) {
      return res.serverError(error);
    }
  },

  // POST /api/community/:id/post
  createPostInCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const community = await CommunityService.getCommunityById(id);

      if (!community) {
        return res.notFound({ message: 'Community not found' });
      }
      const post = await CommunityService.createPostInCommunity({ communityId: id, title, content });

      return res.json(post);
    } catch (error) {
      return res.serverError(error);
    }
  },

};
