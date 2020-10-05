import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
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
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserInput({ email: userInput.email, pass: userInput.password });

    axios({
      url: "/user/login",
      method: "POST",
      data: userInput,
    })
      .then((res) => {
        const { msg, user } = res.data;
        console.log(user);
        toast(msg, toastMods);
      })
      .catch((err) => console.log(err));

    clearInput();
    //console.log(userInput);
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
    }
  };

  const clearInput = () => {
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
            <h3 className="pink-text text-font">Log in</h3>
          </div>
          <div className="card-content">
            <div className="input-field s12 red-text text-lighten-3">
              <i className="material-icons prefix">email</i>
              <input
                onChange={handleChange}
                id="emailInput"
                type="email"
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
