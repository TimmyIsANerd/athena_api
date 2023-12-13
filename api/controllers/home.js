module.exports = {
  friendlyName: "Home",

  description: "Home something.",

  inputs: {},

  exits: {},

  fn: async function () {
    const { res } = this;

    return res.status(200).json({
      message: "Athena Hub Server is Live 🚀",
    });
  },
};
