const express = require("express");

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

const router = express.Router();

module.exports = router;

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get all books"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the Books",
    data: books,
  });
});

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get all issued books by their id"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/:issued", (req, res) => {
  const userswithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];
  userswithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "This book has not been issued yet",
    });
  }

  return res.status(200).json({
    success: true,
    message: "This book is issued as of now",
    data: issuedBooks,
  });
});

/**
 * Route : "/"
 * Method: "Get"
 * Description: "Get a particular book by its id"
 * Access: "Public"
 * Parameters: "None"
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book does not exist",
      data: null,
    });
  }

  res.status(200).json({
    success: true,
    message: "Book with the particular id received",
    data: book,
  });
});

/**
 * Route : "/"
 * Method: "Post"
 * Description: "Adding a new book"
 * Access: "Public"
 * Parameters: "id","name","genre","price","publisher","author"
 */

router.put("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Please Provide data in order to add a book",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(200).json({
      success: false,
      message: "ID already exists",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book addition successful",
    data: allBooks,
  });
});

/**
 * Route : "/:id"
 * Method: "Put"
 * Description: "Upload a book by its id"
 * Access: "Public"
 * Parameters: "id"
 */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const bookIndex = books.findIndex((each) => each.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found for this particular ID",
    });
  }

  const updatedBook = { ...books[bookIndex], ...data };

  books[bookIndex] = updatedBook;

  return res.status(200).json({
    success: true,
    message: "Updated a Book by the id",
    data: updatedBook,
  });
});
