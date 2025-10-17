const Book = require("../models/book");

exports.getBook = (req, res, next) => {
  const book = [
    {
      _id: "fdskfs",
      userId: "user123",
      title: "The Shadow of Eternity",
      author: "Aria Winters",
      imageUrl: "",
      year: 2022,
      genre: "Fantasy",
      ratings: [
        { userId: "user123", grade: 5 },
        { userId: "user456", grade: 4 },
        { userId: "user789", grade: 5 },
      ],
      averageRating: 4.67,
    },
  ];
  //   Book.find()
  //     .then((books) => {
  //       res.status.apply(200).json(books);
  //     })
  //     .catch((error) => {
  //       res.status(400).json({
  //         error: error,
  //       });
  //     });

  res.status(200).json(book);
};

exports.createBook = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
    averageRating: req.body.averageRatings,
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
