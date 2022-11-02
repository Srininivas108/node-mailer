const express = require("express");
const { login, signup, forgotpassword } = require("../controllers/userController");
 

const userRouter = express.Router();

userRouter.post("/signup",signup);

userRouter.put("/login",login);

userRouter.put("/forgotpassword",forgotpassword);

module.exports = userRouter;