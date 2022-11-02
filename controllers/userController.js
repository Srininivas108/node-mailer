const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//SignUp
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      username: username,
      email: email,
      password: hashedpassword,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY
    );
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//ForgetPassword
const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //generate random password
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gpasswordLength = 8;
    let gpassword = "";
    for (let i = 0; i <= gpasswordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      gpassword += chars.substring(randomNumber, randomNumber + 1);
    }
    const newhashedpassword = await bcrypt.hash(gpassword, 10);
    existingUser.password = newhashedpassword;
    await existingUser.save();                            //update password with generated password

    //RandomGenreated Password sent to Your Mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email, //email from req body                     
      subject: "RESET PASSWORD!!",
      text: "Use below New Password to Login",
      html: `<p>use This <u><b>${gpassword}</b></u> new password to login </p>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent with New Password" + info.response);
        res.status(201).json({ info });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, login, forgotpassword };
