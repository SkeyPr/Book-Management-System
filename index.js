const express = require("express");

const users = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is now up and running",
  });
});

/**
 * Route : "/users"
 * Method: "Get"
 * Description: "Get all users"
 * Access: "Public"
 * Parameters: "None"
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route : "/books"
 * Method: "Get"
 * Description: "Get all books"
 * Access: "Public"
 * Parameters: "None"
 */

app.get("/books", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * http://localhost:8081/users/:id
 * Route : "/users/:id"
 * Method: "Get"
 * Description: "Get all users by their id"
 * Access: "Public"
 * Parameters: "id"
 */

app.get("/users/:id", (req, res) => {
  // const  id  = req.params.id;
  const { id } = req.params;
  console.log(req.params);
  const user = users.users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * http://localhost:8081/users/
 * Route : "/users/"
 * Method: "POST"
 * Description: "Creating a new User"
 * Access: "Public"
 * Parameters: "None"
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with that ID already exists",
    });
  }

  users.users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User added succesfully",
    data: users,
  });
});

/**
 * http://localhost:8081/users/
 * Route : "/users/:id"
 * Method: "PUT"
 * Description: "Updating a User by their id"
 * Access: "Public"
 * Parameters: "ID"
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid ID",
    });
  }

  const updateUserData = users.users.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: "User Updated",
    data: updateUserData,
  });
});

/**
 * http://localhost:8081/users/
 * Route : "/users/:id"
 * Method: "DELETE"
 * Description: "Deleting a User by their id"
 * Access: "Public"
 * Parameters: "ID"
 */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Deletion not Possible",
    });
  }

  //logic for deletion goes here
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not Exist",
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port ${PORT}");
});
