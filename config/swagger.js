module.exports.swaggerConfig = {
  defaults: {
    responses: {
      200: {
        description: "The requested resource",
      },
      201: {
        description: "New Resource Created",
      },
      400: {
        description: "Bad Request",
      },
      409: {
        description: "Conflict Error",
      },
      404: {
        description: "Resource not found",
      },
      500: {
        description: "Internal server error",
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  swagger: {
    info: {
      title: "Athena REST API",
      description:
        "This is a generated swagger json to make integration seamless",
      contact: {
        name: "Adefeyitimi Gbolahan Adeyeloja",
        url: "https://github.com/TimmyIsANerd",
        email: "adefeyitimi@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.0",
    },
    host: "localhost:1337",
    externalDocs: {
      url: "localhost:1337",
    },
    basePath: "/",
    schemes: ["http", "https"],
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        description: "JWT Bearer Token",
        name: "Authorization",
        in: "header",
      },
    },
  },
};
