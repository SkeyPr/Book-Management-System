const express = require("express");

const users = require("./data/users.json");

const userRouter = require("./routes/users");

const booksRouter = require("./routes/books");

const app = express();
app.use(express.json());

// http://localhost:8081/users/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
