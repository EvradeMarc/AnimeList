const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AnimeListPro API",
      version: "1.0.0",
      description: "Documentation API pour AnimeListPro",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            image: { type: "string" },
            username: { type: "string", required: true, unique: true },
            email: { type: "string", required: true, unique: true },
            password: { type: "string", required: true },
            animes: { type: "array", items: { type: "string" } },
          },
        },
        Auth: {
          type: "object",
          properties: {
            userId: { type: "string" },
            token: { type: "string" },
          },
        },
        Anime: {
          type: "object",
          required: ["title", "season", "episode", "statuts"],
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            title_romaji: { type: "string" },
            title_english: { type: "string" },
            description: { type: "string" },
            image: { type: "string" },
            genres: {
              type: "array",
              items: { type: "string" },
            },
            season: { type: "number" },
            episode: { type: "number" },
            releaseDate: { type: "string", format: "date" },
            statuts: {
              type: "string",
              enum: [
                "En cours",
                "En attente de la suite",
                "Terminé",
                "À venir",
              ],
            },
          },
        },
        CreateAnimeInput: {
          type: "object",
          required: ["title", "season", "episode", "statuts"],
          properties: {
            title: { type: "string" },
            season: { type: "number" },
            episode: { type: "number" },
            statuts: {
              type: "string",
              enum: [
                "En cours",
                "En attente de la suite",
                "Terminé",
                "À venir",
              ],
            },
          },
        },
        UpdateAnimeInput: {
          type: "object",
          properties: {
            season: { type: "number" },
            episode: { type: "number" },
            statuts: {
              type: "string",
              enum: [
                "En cours",
                "En attente de la suite",
                "Terminé",
                "À venir",
              ],
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        SignupInput: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./Routes/*.js", "./Controllers/*.js"],
};

module.exports = swaggerJsdoc(options);
