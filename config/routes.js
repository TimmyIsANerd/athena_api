/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': { action: 'home' },

  // User Authentication
  'POST /api/v1/auth/signup': { action: 'auth/signup', swagger: {} },
  'POST /api/v1/auth/login': { action: 'auth/login', swagger: {} },


  // CommunityController routes
  'GET /api/community': 'CommunityController.getCommunities',
  'POST /api/community/tutors': 'CommunityController.createTutorCommunity',
  'POST /api/community/students': 'CommunityController.createStudentForum',

  // CommentController routes
  'POST /api/community/comments/:forumId': 'CommentController.postComment',
  'POST /api/community/comments/reply/:commentId': 'CommentController.postReply',

};
