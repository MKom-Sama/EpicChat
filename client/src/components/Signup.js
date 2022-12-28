import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const toastMods = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  };
  const btnVariants = {
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.09,
      },
    },
  };
  const iconVariants = {
    hover: {
      rotate: -50,
      transition: {
        duration: 0.09,
      },
    },
  };
  const [userInput, setUserInput] = useState({});

  const isValidEmail = (value) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value);
  // min 8 letters, max 10 atleast one upper one lower one number one special character
  const isValidPassword = (value) => new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserInput({
      username: userInput.username,
      email: userInput.email,
      pass: userInput.password,
    });

    // Regex Validation

    let msg = '';
    if (!isValidEmail(userInput.email)) {
      msg = 'Invalid Email';
    }

    if (!isValidPassword(userInput.password)) {
      if (msg !== '') {
        msg += ' and Invalid password';
      } else {
        msg = 'Password must be 8-10 with at least upper,lower,number and a special character';
      }
    }

    if (msg) {
      toast(msg, toastMods);
      return;
    }

    axios({
      url: "/user/signup",
      method: "POST",
      data: userInput,
    })
      .then((res) => {
        toast(res.data,toastMods);
      })
      .catch((err) => console.log(err));

    clearInput();
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "emailInput":
        userInput.email = e.target.value;
        break;
      case "passwordInput":
        userInput.password = e.target.value;
        break;
      default:
        userInput.username = e.target.value;
    }
  };

  const clearInput = () => {
    document.getElementById("usernameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
  };
  return (
    <div className="container ">
      <br />
      <br />
      <br />
      <br />
      <div className="card center lighten-3">
        <form
          className="col s12 m6 l2 z-depth-2 card-panel "
          action=""
          id="login-form"
          onSubmit={handleSubmit}
        >
          <div className="card-title">
            <h3 className="pink-text text-font">Sign up</h3>
          </div>
          <div className="card-content">
            <div className="input-field s12 red-text text-lighten-3">
              <i className="material-icons prefix">face</i>
              <input
                onChange={handleChange}
                id="usernameInput"
                type="text"
                required
              />
              <label htmlFor="usernameInput">Username</label>
            </div>
            <div className="input-field s12 red-text text-lighten-3">
              <i className="material-icons prefix">email</i>
              <input
                onChange={handleChange}
                id="emailInput"
                type="text"
                required
              />
              <label htmlFor="emailInput">Email</label>
            </div>
            <div className="input-field s12 red-text text-lighten-3">
              <i className="material-icons prefix">lock_outline</i>
              <input
                onChange={handleChange}
                id="passwordInput"
                type="password"
                required
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
          </div>
          <div>
            <motion.button
              variants={btnVariants}
              whileHover="hover"
              href="#"
              className="btn-large waves-effect red text-font"
              type="submit"
            >
              Login{" "}
              <motion.i variants={iconVariants} className="material-icons right">
                send
              </motion.i>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
