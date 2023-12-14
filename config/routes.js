/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "/": { action: "home" },

  // User Authentication
  "POST /api/v1/auth/signup": { action: "auth/signup", swagger: {} },
  "POST /api/v1/auth/login": { action: "auth/login", swagger: {} },
};
