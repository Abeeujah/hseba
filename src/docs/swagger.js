import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: `Tagdeep API Docs`,
      version: "1.0.0",
      description: "API documentation for Tagdeep services.",
    },
    servers: [
      { url: "http://localhost:3000/" },
      { url: "https://tdbizz-backend.onrender.com/" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export async function swaggerDocs(app, port) {
  //   Swagger Page
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //   Docs in JSON format
  //   (Import in Postman)
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available on http://localhost:${port}/api/docs`);
}
