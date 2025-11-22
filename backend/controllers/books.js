const Book = require("../models/book");
const fs = require("fs");
const path = require("path");

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

exports.updateBook = (req, res, next) => {
  let bookObject = !req.file ? req.body : JSON.parse(req.body.book);

  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book does not exist" });
      }

      if (!req.auth.userId || book.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Unauthorized request" });
      }

      if (req.file) {
        if (book.imageUrl) {
          const oldFilename = book.imageUrl.split("/images/")[1];

          fs.unlink(path.join("images", oldFilename), (err) => {
            if (err) {
              console.error("Error deleting iamge file:", err);
            }
          });
        }

        const url = req.protocol + "://" + req.get("host");
        bookObject.imageUrl = url + "/images/" + req.file.filename;
      }

      delete bookObject._id;
      delete bookObject.userId;

      Book.updateOne({ _id: req.params.id }, { $set: bookObject })
        .then(() => {
          return res.status(200).json({ message: "Book updated successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
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
    userId: req.auth.userId,
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

exports.deleteBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book does not exist" });
      }

      if (!req.auth.userId || book.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Unauthorized request" });
      }

      if (book.imageUrl) {
        const filename = book.imageUrl.split("/images/")[1];

        fs.unlink(path.join("images", filename), (err) => {
          if (err) {
            console.error("Error deleting iamge file:", err);
          }
        });
      }

      book
        .deleteOne()
        .then(() => {
          return res.status(200).json({ message: "Book deleted successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.createRating = (req, res, next) => {
  console.log(`User id ${req.body.userId}`);

  // authentication check
  if (!req.auth.userId || req.body.userId !== req.auth.userId) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

  if (
    !Number.isInteger(req.body.rating) ||
    req.body.rating > 5 ||
    req.body.rating < 1
  ) {
    return res.status(400).json({ error: "Bad rating" });
  }

  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book does not exist" });
      }

      console.log(`Book's User Id ${book}`);

      const alreadyRated = book.ratings.some(
        (rating) => rating.userId === req.auth.userId
      );

      if (alreadyRated) {
        return res.status(400).json({ error: "Rating already exists" });
      }

      const newRating = { userId: req.auth.userId, grade: req.body.rating };
      book.ratings.push(newRating);

      const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);

      book.averageRating = total / book.ratings.length;

      book
        .save()
        .then(() => {
          return res.status(201).json(book);
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
