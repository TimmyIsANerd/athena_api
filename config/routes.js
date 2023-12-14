const { description } = require("../api/controllers/auth/signup");

module.exports.routes = {
  "/": { action: "home" },

  // User Authentication
  "POST /api/v1/auth/signup": {
    action: "auth/signup",
    swagger: {
      responses: {
        201: {
          description: "Returns JWT Token",
          examples: {
            "application/json": {
              message: "Successfully created new user",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiAiMTIzNDU2Nzg5MCIsIC",
            },
          },
        },
        500: {
          description: "Internal server error",
        },
        400: {
          description: "Bad Request",
        },
      },
    },
  },

  "POST /api/v1/auth/login": {
    action: "auth/login",
    swagger: {
      responses: {
        200: {
          description: "User Logged in Successfully",
          examples: {
            "application/json": {
              message: "User Logged in Successfully",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjU3YWU2NDUzMDY5ZDg0NGQxOWZmMzUyIiwiaWF0IjoxNzAyNTUzMjI4LCJleHAiOjE3MDUxNDUyMjh9._KY6ssQ848VieJ7XBBkZQY4orZa2_mtzpa4UiUA-81Q",
            },
          },
        },
      },
    },
  },

  // User Profile
  "GET /api/v1/profile": {
    action: "profile/get-user",
    swagger: {
      responses: {
        200: {
          description: "Successfully retrieved User Profile",
          examples: {
            "application/json": {
              createdAt: 1702553157486,
              updatedAt: 1702553228612,
              id: "657ae6453069d844d19ff352",
              emailAddress: "adefeyitimi@gmail.com",
              userAccountType: "student",
              emailVerificationStatus: "",
              emailProofToken: "",
              emailProofTokenExpiresAt: 0,
              passwordResetToken: "",
              passwordResetTokenExpiresAt: 0,
              lastLoggedInAt: "1702553228612",
              profile: {
                createdAt: 1702553157508,
                updatedAt: 1702553157508,
                id: "657ae6453069d844d19ff353",
                firstName: "Ade",
                lastName: "Dayo",
                billingAddress: "",
                city: "",
                phoneNumber: "",
                avatarImageURL: "",
                avatarImagePublicId: "",
              },
            },
          },
        },
        404: {
          description: "Resource not found",
          examples: {
            "application/json": {
              error: "Resource Not Found",
              message: "User does not exist in Database",
            },
          },
        },
      },
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          description: "JWT Bearer Token",
          name: "Authorization",
          in: "header",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },

  "PATCH /api/v1/profile": {
    action: "profile/update-user",
    swagger: {
      responses: {
        200: {
          description: "Successfully updated profile",
          examples: {
            "application/json": {
              message: "Successfully updated profile",
            },
          },
        },
        500: {
          description: "Internal server error",
        },
      },
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          description: "JWT Bearer Token",
          name: "Authorization",
          in: "header",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },

  // Upload Profile Picture
  "POST /api/v1/profile/avatar": {
    action: "profile/upload-avatar",
    swagger: {
      consumes: ["multipart/form-data"],
      parameters: [
        {
          name: "avatar",
          in: "formData",
          type: "file",
          required: true,
          description: "Select an image file to upload as the avatar.",
        },
      ],
      responses: {
        200: {
          description: "Successfully uploaded avatar",
          examples: {
            "application/json": {
              message: "Successfully uploaded Profile Avatar",
            },
          },
        },
        500: {
          description: "Internal server error",
        },
        400: {
          description: "No Uploaded File received by server",
        },
      },
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          description: "JWT Bearer Token",
          name: "Authorization",
          in: "header",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },

  // Create Course
  "POST /api/v1/course/create-course": { action: "course/create-course" },
  // Update Course

  // Delete Course
};
