const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*Routes starting with /user */

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const userInput = req.body;

  const emailAlreadyExist = await User.findOne({ email: userInput.email });

  if (emailAlreadyExist) res.send("Email Already Exists");
  else {
    try {
      // hashing user password

      const salt = await bcrypt.genSalt(10);
      userInput.password = await bcrypt.hash(userInput.password, salt);
    } catch (err) {
      console.log(err);
    }

    const newUser = new User(userInput);

    newUser
      .save()
      .then(res.send("User Created!  Welcome Intellectual"))
      .catch((err) => console.log(err));
  }
});

router.post("/login", async (req, res) => {
  const userInput = req.body;

  const emailExist = await User.findOne({ email: userInput.email });

  if (!emailExist) res.send("Email doesn't exist , sign up :) ");
  else {
    const user = emailExist;

    //checking for the password

    const validPass = await bcrypt.compare(userInput.password, user.password);

    if (validPass) {
      const accessToken = jwt.sign(
        { user: { username:user.username, email:user.email } },
        process.env.ACCESS_TOKEN_SECRET
      );

      res
        .cookie("Access_Token", accessToken, {
          expires: new Date(Date.now() + 900000), // if 900000 = 8*36000000 (cookie expires in 8 hours)
          secure: false, // set to true if your using https
          httpOnly: true,
        })
        .send({ msg: `Welcome ${user.username}`, user: { username:user.username, email:user.email } });
    } else {
      res.send({ msg: " Invalid Password try again" });
    }
  }
});


module.exports = router;
