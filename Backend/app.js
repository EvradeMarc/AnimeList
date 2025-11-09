const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const animeRoutes = require("./Routes/animeRoutes");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(() => console.log("Failed to connect to MongoDB!"));

app.use(express.json());

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/animes", animeRoutes);

module.exports = app;
