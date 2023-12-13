module.exports.swagger = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Athena Hub REST API Documentation",
      version: "1.0.0",
      description: "Documented Endpoints for Athena Hub Edu-Tech REST API Project",
    },
  },
  apis: ["./api/controllers/*.js", "./api/models/*.js"], 
};