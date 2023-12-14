module.exports = {
  friendlyName: "Update User",

  description: "Update User Profile",

  inputs: {
    firstName: {
      type: "string",
      description: "User's First Name",
    },

    lastName: {
      type: "string",
      description: "User's Last Name",
    },

    billingAddress: {
      type: "string",
      description: "User's Description",
    },

    city: {
      type: "string",
      description: "User's City",
    },

    phoneNumber: {
      type: "string",
      description: "Phone Number",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully Updated User Profile",
    },
  },

  fn: async function (inputs, exits) {
    const { firstName, lastName, billingAddress, city, phoneNumber } = inputs;

    const { req, res } = this;
    const id = req.user;
    const userProfile = await User.findOne({ id });

    const profileRecord = await Profile.findOne({ id: userProfile.profile });

    if (!profileRecord) {
      return res.notFound("Profile Not Found");
    }

    try {
      await Profile.updateOne({ id: profileRecord.id }).set({
        firstName,
        lastName,
        billingAddress,
        city,
        phoneNumber,
      });
    } catch (error) {
      return res.serverError();
    }

    return exits.success({
      message: "Successfully updated profile",
    });
  },
};
