/**
 * CoursesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {
  generateCertificate: async (user, course, progress) => {
    const doc = new PDFDocument();

    // Certificate template using PDFKit methods
    doc.fontSize(18).text(`Certificate of Completion\n\n`, { align: 'center' });
    doc.fontSize(12).text(`This is to certify that\n\n`, { align: 'center' });
    doc.fontSize(16).text(`${user.name}\n\n`, { align: 'center' });
    doc.fontSize(12).text(`has successfully completed the course\n\n`, { align: 'center' });
    doc.fontSize(16).text(`${course.title}\n\n`, { align: 'center' });

    if (progress) {
      doc.fontSize(10).text(`- Completion Date: ${progress.completionDate}\n`);
    }

    // Certificate savings
    const certificatePath = `./store/${user.id}_${course.id}_certificate.pdf`;
    doc.pipe(fs.createWriteStream(certificatePath));
    doc.end();

    return certificatePath;
  },
};
