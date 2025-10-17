require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

const app = express();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.t8i1sus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoB");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
