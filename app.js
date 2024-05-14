const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/Book.model");

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-intro-dev")
  .then((res) =>
    console.log("connected to DB name: " + res.connections[0].name)
  )
  .catch((err) => console.log(err.message));

app.post("/books", (req, res) => {
  Book.create(req.body).then((createdBook) => res.json({ createdBook }));
});

app.get("/books", (req, res) => {
  Book.find().then((foundBooks) => res.json(foundBooks));
});

app.delete("/books/:bookID", (req, res) => {
  const { bookID } = req.params;

  Book.findByIdAndDelete(bookID).then((foundBooks) => res.json(foundBooks));
});

app.put("/books/:bookID", (req, res) => {
  const { bookID } = req.params;

  Book.findByIdAndUpdate(bookID, req.body).then((foundBooks) =>
    res.json(foundBooks)
  );
});

// const cities = ["Miami", "Madrid", "Barcelona"];

// app.get("/city-list", (req, res) => {
//   const { city } = req.query;
//   // const city = req.query.city;
//   cities.push(city);
//   res.json({ cities: cities });
// });

app.listen(3000, () => console.log("App listening on port 3000!"));
