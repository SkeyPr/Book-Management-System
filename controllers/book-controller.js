const bookModel = require("../models/book-model");

const BookModel = require("../models/book-model");

const UserModel = require("../models/user-model");

const issuedBook = require("../dtos/book-dto.js");

const getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Books found",
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book Found by the ID",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  const issuedBooks = users.map((each) => new issuedBook(each));

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
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "Pls Provide Data to add a Book",
    });
  }
  const book = await BookModel.create(data);
  await BookModel.create(data);
  const allBooks = await BookModel.find();

  // if (book) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "ID already Exists",
  //   });
  // }

  return res.status(201).json({
    success: true,
    message: "Book added Succesfully",
    data: allBooks,
  });
};

exports.updateBookByID = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updateBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "Updated a Book by the id",
    data: updatedBook,
  });
};

module.exports = { getAllBooks, getSingleBookById };
