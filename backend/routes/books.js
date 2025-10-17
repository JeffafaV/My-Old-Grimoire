const express = require("express");
const router = express.Router();

const booksCtrl = require("../controllers/books");

const Book = require("../models/book");

router.post("/", booksCtrl.createBook);

router.get("/", booksCtrl.getBook);

module.exports = router;
