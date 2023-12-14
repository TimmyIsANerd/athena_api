module.exports = {
  friendlyName: "Get User Profile",

  description: "",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully retrieved User Profile",
    },
  },

  fn: async function (inputs, exits) {
    const { req } = this;
    const id = req.user;

    const userRecord = await User.findOne({ id }).populate("profile");
    delete userRecord.password;

    return exits.success(userRecord);
  },
};
