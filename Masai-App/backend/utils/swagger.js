const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Masai - Kanban Board",
    version: "1.0.0",
    description: "API documentation for my application",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // JWT format for bearer token
      },
    },
  },
  // Optionally, you can add global security to require the Bearer token for all endpoints
  security: [
    {
      BearerAuth: [],
    },
  ],
};

// Swagger options
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
