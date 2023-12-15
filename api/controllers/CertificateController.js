/**
 * CertificateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const CertificateService = require('../services/CertificateService');

module.exports = {
  generateCertificate: async (req, res) => {
    try {
      const { userId, courseId, progressId } = req.body;

      const certificatePath = await CertificateService.generateCertificate(userId, courseId, progressId);

      // Create a new Certificate record in the database
      const newCertificate = await Certificate.create({
        user: userId,
        course: courseId,
        path: certificatePath,
      }).fetch();

      return res.json(newCertificate);
    } catch (error) {
      return res.serverError(error);
    }
  },

  downloadCertificate: async (req, res) => {
    try {
      const { id } = req.params;

      // Finding Certificate record
      const certificate = await Certificate.findOne({ id });

      if (!certificate) {
        return res.notFound({ message: 'Certificate not found' });
      }


      // Sending certificate file for download
      res.download(certificate.path, `Certificate_${id}.pdf`);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

