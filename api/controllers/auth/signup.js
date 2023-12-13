const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Signup",

  description: "Signup auth.",

  inputs: {
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
      responseType: "emailAlreadyInUse",
      description: "The provided email address / username is already in use.",
    },
    invalid: {
      responseType: "badRequest",
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },
  },

  fn: async function ({ emailAddress, password, userAccountType }) {
    const { req, res } = this;

    if (password.length < 8) {
      return res.status(400).json({
        message: "Bad Request",
        error: "Password is less than 8 characters",
      });
    }

    const newUser = await User.create({
      emailAddress,
      password,
      userAccountType,
    })
      .intercept("E_UNIQUE", "emailAlreadyInUse")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    if (!newUser) {
      return res.recordCreationFailed("Failed to Create New User");
    }

    // Initialize New Profile
    const newProfile = await Profile.create({
      user: newUser.id,
    });

    return res.status(201).json({
      message: "Successfully created new profile",
      token: jwt.sign({ user: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  },
};
