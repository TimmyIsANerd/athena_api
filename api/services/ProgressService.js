/**
 * CommunityController
 *
 * @description :: Server-side actions for handling community-related requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const CourseService = require('./CourseService');
const CertificateService = require('./CertificateService');

module.exports = {
  updateProgress: async (userId, courseId, pageId, videoId, watchedDuration) => {
    try {
      const userEnrollment = await Enrollment.findOne({ userId, courseId });
      if (!userEnrollment) {
        throw new Error('User is not enrolled in the course');
      }

      if (pageId) {
        await Progress.updateOne({ userId, courseId })
          .set({ $inc: { pagesRead: 1 } });
      }

      if (videoId && watchedDuration) {
        await Progress.updateOne({ userId, courseId })
          .set({ $inc: { videosWatched: watchedDuration } });
      }
    } catch (error) {
      throw error;
    }
  },

  getUserProgress: async (userId, courseId) => {
    try {
      const userProgress = await Progress.findOne({ userId, courseId });

      if (!userProgress) {
        throw new Error('User progress not found');
      }
      return userProgress;
    } catch (error) {
      throw error;
    }
  },

  calculateCompletionStatus: async (userId, courseId) => {
    try {
      const userProgress = await Progress.findOne({ userId, courseId });

      if (!userProgress) {
        throw new Error('User progress not found');
      }

      const courseThresholds = await CourseService.getCourseThreshold(courseId);
      // Checking completion with thresholds
      const isPagesCompleted = userProgress.pagesRead >= courseThresholds.pagesThreshold;
      const isVideosCompleted = userProgress.videosWatched >= courseThresholds.videosThreshold;

      const completionStatus = isPagesCompleted && isVideosCompleted;

      // Completion status in the progress record
      await Progress.updateOne({ userId, courseId })
        .set({ completionStatus });

      if (completionStatus) {
        const user = await User.findOne({ id: userId });
        const course = await Course.findOne({ id: courseId });
        const progress = await Progress.findOne({ userId, courseId });


        const certificatePath = await CertificateService.generateCertificate(user, course, progress);

        // Save certificate to the user's record

        await User.updateOne({ id: userId })
          .set({ certificatePath });

      }

      return { completionStatus };

    }
    catch (error) {
      throw error;
    }
  },
};
