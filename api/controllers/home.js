module.exports = {
  friendlyName: "Home",

  description: "Home something.",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Successfully ",
    },
  },

  fn: async function (inputs, exits) {
    const { res } = this;

    return exits.success({
      message: "Athena Hub Server is Live 🚀",
    });
  },
};
