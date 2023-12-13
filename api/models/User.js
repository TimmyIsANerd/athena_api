/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
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

    profile: {
      model: "profile",
      unique: true,
    },

    emailVerificationStatus: {
      type: "string",
      description: "Email Verification Status, Unverified/Verified",
      isIn: ["Verified", "Unverified"],
    },

    emailProofToken: {
      type: "string",
      description:
        "A pseudorandom, probabilistically-unique token for use in our account verification emails.",
    },

    emailProofTokenExpiresAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user's `emailProofToken` will expire (or 0 if the user currently has no such token).",
      example: 1502844074211,
    },

    passwordResetToken: {
      type: "string",
      description:
        "A unique token used to verify the user's identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.",
    },

    passwordResetTokenExpiresAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user's `passwordResetToken` will expire (or 0 if the user currently has no such token).",
      example: 1502844074211,
    },

    lastLoggedInAt: {
      type: "string",
      description:
        "A JS timestamp (epoch ms) representing the moment when this user last logged in.",
      example: 1502844074211,
    },
  },
};
