const { BookModel, UserModel } = require("../models");

const IssuedBook = require("../dtos/book-dto.js");

exports.getAllusers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "The users are ",
    data: users,
  });
};

//single user by id
// (req, res) => {
//   // const  id  = req.params.id;
//   const { id } = req.params;
//   console.log(req.params);
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "User Found",
//     data: user,
//   });
// };

exports.getSingleUserbyID = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
};

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);

//   return res
//     .status(200)
//     .json({ success: true, message: "Deleted User..", data: users });
// });

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: users });
};

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const updateUserData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData,
//   });
// });

exports.UpdateUserbyId = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updateUserData = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...data } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
};

// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   const user = users.find((each) => each.id === id);

//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "User With The ID Exists",
//     });
//   }

//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });

//   return res.status(201).json({
//     success: true,
//     message: "User Added Succesfully",
//     data: users,
//   });
// });

exports.CreateUser = async (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const newUser = await UserModel.create(
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
  );

  return res.status(201).json({
    success: true,
    message: "User Added Succesfully",
    data: users,
  });
};

// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User With The ID does not exist",
//     });
//   }

//   const getDateInDays = (data = "") => {
//     let date;
//     if (data === "") {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   };

//   const subscriptionType = (date) => {
//     if (user.subscriptionType === "Basic") {
//       date = date + 90;
//     } else if (user.subscriptionType === "Standard") {
//       date = date + 180;
//     } else if (user.subscriptionType === "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     isSubscriptionExpired: subscriptionExpiration < currentDate,
//     daysLeftForExpiration:
//       subscriptionExpiration <= currentDate
//         ? 0
//         : subscriptionExpiration - currentDate,
//     fine:
//       returnDate < currentDate
//         ? subscriptionExpiration <= currentDate
//           ? 100
//           : 50
//         : 0,
//   };
//   return res.status(200).json({
//     success: true,
//     message: "Subscription details for this particular user are: ",
//     data,
//   });
// });

exports.UserSub = async (req, res) => {
  const { id } = req.params;
  find({ _id: id });
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID does not exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription details for this particular user are: ",
    data,
  });
};
