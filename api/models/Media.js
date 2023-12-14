/**
 * Media.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: "string",
      description: "Title of Media File",
    },

    fileType: {
      type: "string",
      isIn: ["pdf", "video", "image"],
      description: "Uplad",
    },

    fileUploadURL: {
      type: "string",
      description: "File Type Cloudinary URL",
    },

    section: {
      model: "section",
    },
  },
};
