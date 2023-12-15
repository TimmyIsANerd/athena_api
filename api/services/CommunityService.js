module.exports = {
  getCommunityById: async (id) => {
    try {
      const community = await Community.findOne({ id });

      return community;
    } catch (error) {
      throw error;
    }
  },

  createPostInCommunity: async ({ communityId, title, content }) => {
    try {
      // Create a new post within the community
      const post = await Post.create({ title, content, communityId }).fetch();

      return post;
    } catch (error) {
      throw error;
    }
  },
};
