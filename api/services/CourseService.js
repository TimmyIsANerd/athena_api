


module.exports = {
  getCourseThresholds: async (courseId) => {
    try {
      // Fetch custom thresholds for the course
      const course = await Course.findOne({ id: courseId });

      if (!course) {
        throw new Error('Course not found');
      }

      return {
        pagesThreshold: course.pagesThreshold || 0,
        videosThreshold: course.videosThreshold || 0.8, // Default to 80% completion for videos
      };
    } catch (error) {
      throw error;
    }
  },
};
