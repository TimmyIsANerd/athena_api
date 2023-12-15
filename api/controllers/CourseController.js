/**
 * CoursesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      return res.json(courses);
    } catch (error) {
      return res.serverError(error);
    }
  },

  getCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findOne({ id });

      if (!course) {
        return res.notFound({ message: 'Course not found' });
      }

      return res.json(course);
    } catch (error) {
      return res.serverError(error);
    }
  },

  createCourse: async (req, res) => {
    try {
      const { title, description, pagesThreshold, videosThreshold } = req.body;

      const newCourse = await Course.create({
        title,
        description,
        pagesThreshold,
        videosThreshold,
      }).fetch();

      return res.json(newCourse);
    } catch (error) {
      return res.serverError(error);
    }
  },

  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, pagesThreshold, videosThreshold } = req.body;

      const updatedCourse = await Course.updateOne({ id })
        .set({
          title,
          description,
          pagesThreshold,
          videosThreshold,
        });

      if (!updatedCourse) {
        return res.notFound({ message: 'Course not found' });
      }

      return res.json(updatedCourse);
    } catch (error) {
      return res.serverError(error);
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedCourse = await Course.destroyOne({ id });

      if (!deletedCourse) {
        return res.notFound({ message: 'Course not found' });
      }

      return res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
