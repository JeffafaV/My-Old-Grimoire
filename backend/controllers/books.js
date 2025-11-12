const Book = require("../models/book");

exports.getBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      console.log(books);
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((bestBooks) => {
      res.status(200).json(bestBooks);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);

  // authentication check
  if (bookObject.userId && bookObject.userId !== req.auth.userId) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

  console.log(bookObject);
  console.log(req.auth.userId);

  const url = req.protocol + "://" + req.get("host");

  const book = new Book({
    title: bookObject.title,
    author: bookObject.author,
    imageUrl: url + "/images/" + req.file.filename,
    year: bookObject.year,
    genre: bookObject.genre,
    ratings: bookObject.ratings,
    averageRating: bookObject.averageRating,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
