/**
 * Profile.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      collection: "user",
      via: "profile",
    },

    firstName: {
      type: "string",
      description: "User's first name",
      example: "John",
    },

    lastName: {
      type: "string",
      description: "User's last name",
      example: "Doe",
    },

    billingAddress: {
      type: "string",
      description: "User's Billing Address",
    },

    city: {
      type: "string",
      description: "User's City",
    },

    phoneNumber: {
      type: "string",
      description: "User's Active Phone Number",
    },

    avatarImageURL: {
      type: "string",
      description: "User's Avatar Image URL",
    },

    avatarImagePublicId: {
      type: "string",
      description: "User's Avatar Image Public ID",
    },
  },
};
