const express = require("express");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookByID,
} = require("../controllers/book-controller");

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

const BookModel = require("../models/book-model");

const UserModel = require("../models/user-model");

const router = express.Router();

module.exports = router;

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get all books"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/", getAllBooks);

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Got all the Books",
//     data: books,
//   });
// });

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get all issued books by their id"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/:issued", getAllIssuedBooks);

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get a particular book by its id"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/:id", getSingleBookById);

/**
 * Route : "/"
 * Method: "Post"
 * Description: "Adding a new book"
 * Access: "Public"
 * Parameters: "id","name","genre","price","publisher","author"
 */

router.put("/", getAllBooks);

/**
 * Route : "/:id"
 * Method: "Put"
 * Description: "Upload a book by its id"
 * Access: "Public"
 * Parameters: "id"
 */

router.put("/updateBook/:id", updateBookByID);
