import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateRoom() {
  const [userInput, setUserInput] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserInput({ roomName: userInput.roomName });

    axios({
      url: "/room/create",
      method: "POST",
      data: userInput,
    })
      .then((res) => {
        toast(res.data, toastMods);
      })
      .catch((err) => console.log(err));

    clearInput();
    //console.log(userInput);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "roomName":
        userInput.roomName = e.target.value;
        break;
      default:
    }
  };

  const clearInput = () => {
    document.getElementById("roomName").value = "";
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
  const toastMods = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
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
          id="create-room-form"
          onSubmit={handleSubmit}
        >
          <div className="card-title">
            <h3 className="pink-text title-font">Create a fun room</h3>
          </div>
          <div className="card-content">
            <div className="input-field s12 red-text text-lighten-3">
              <i className="material-icons prefix">local_library</i>
              <input
                onChange={handleChange}
                id="roomName"
                type="text"
                required
              />
              <label htmlFor="roomName">Room Name </label>
            </div>
          </div>
          <div>
            <motion.button
              variants={btnVariants}
              whileHover="hover"
              href="#"
              className="btn-large waves-effect red title-font"
              type="submit"
            >
              Create{" "}
              <motion.i
                variants={iconVariants}
                className="material-icons right"
              >
                send
              </motion.i>
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
