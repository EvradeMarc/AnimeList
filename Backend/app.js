const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/authRoutes");
const animeRoutes = require("./Routes/animeRoutes");
const listPersoRoutes = require("./Routes/listPersoRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((error) => console.log("Failed to connect to MongoDB!", error));

app.use(express.json());

app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/animes", animeRoutes);
app.use("/api/lists", listPersoRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
