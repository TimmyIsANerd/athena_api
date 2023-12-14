const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  friendlyName: "Upload avatar",

  description: "Upload User Profle Picture",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully uploaded avatar",
    },
    noUploadedFile: {
      statusCode: 400,
      description: "No Uploaded File Received",
    },
    uploadFailed: {
      statusCode: 500,
      description: "Avatar Image Upload Failed",
    },
  },

  fn: async function (inputs, exits) {
    const { req } = this;

    if (!req.file("avatar")) {
      return exits.noUploadedFile({
        message: "No Uploaded File Received",
      });
    }

    req.file("avatar").upload(
      {
        maxBytes: 314572800,
      },
      async function whenDone(err, uploadedFiles) {
        if (uploadedFiles.length === 0 || err) {
          return exits.noUploadedFile({
            message: "No Uploaded File Received",
          });
        }

        cloudinary.uploader
          .upload(uploadedFiles[0].fd, {
            folder: "avatar",
          })
          .then(async (result) => {
            const user = await User.findOne({ id: req.user });

            try {
              await Profile.updateOne({ id: user.profile }).set({
                avatarImageURL: result.secure_url,
                avatarImagePublicId: result.public_id,
              });
            } catch (error) {
              sails.log.error(error);
              return res.serverError();
            }
          });
      }
    );

    return exits.success({
      message: "Successfully uploaded Profile Avatar",
    });
  },
};
