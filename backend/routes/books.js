const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const booksCtrl = require("../controllers/books");

const Book = require("../models/book");

router.post("/", auth, multer, booksCtrl.createBook);
router.get("/", booksCtrl.getBooks);
router.get("/bestrating", booksCtrl.getBestRatedBooks);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", auth, multer, booksCtrl.updateBook);
router.delete("/:id", auth, booksCtrl.deleteBook);
router.post("/:id/rating", auth, booksCtrl.createRating);

module.exports = router;
