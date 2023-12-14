const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Signup",

  description: "Signup auth.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
      description: "User's First Name",
    },

    lastName: {
      type: "string",
      required: true,
      descriotion: "User's Last Name",
    },

    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      description: "User's signed up email address",
      isEmail: true,
      maxLength: 200,
      example: "mary.sue@example.com",
    },

    password: {
      type: "string",
      required: true,
      description: "User's Password",
    },

    userAccountType: {
      type: "string",
      required: true,
      description: "User Account Type",
      isIn: ["student", "teacher"],
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "Successfully created a new user",
    },
    emailAlreadyInUse: {
      statusCode: 400,
      responseType: "emailAlreadyInUse",
      description: "The provided email address / username is already in use.",
    },
    invalid: {
      responseType: "badRequest",
      statusCode: 400,
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },
  },

  fn: async function (
    { firstName, lastName, emailAddress, password, userAccountType },
    exits
  ) {
    const { res } = this;

    if (password.length < 8) {
      return res.status(400).json({
        message: "Bad Request",
        error: "Password is less than 8 characters",
      });
    }

    const newUser = await User.create({
      emailAddress,
      password: await sails.helpers.passwords.hashPassword(password),
      userAccountType,
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    if (!newUser) {
      return res.recordCreationFailed("Failed to Create New User");
    }

    try {
      // Initialize New Profile
      const newProfile = await Profile.create({
        user: newUser.id,
        firstName,
        lastName,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server Error",
        message: "Failed to Create User Profile",
      });
    }

    return exits.success({
      message: "Successfully created new profile",
      token: jwt.sign({ user: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  },
};
