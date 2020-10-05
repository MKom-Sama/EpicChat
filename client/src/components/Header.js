import React from "react";
import Logo from "../icons/Logo.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const titleVariants = {
  hidden: {
    x: "-100vw",
  },

  visible: {
    x: 0,
    transition: {
      delay: 2.5,
      duration: 1,
      stiffness: 120,
    },
  },
};

const btnVariants = {
  hover: {
    scale: 1.2,
    transition: {
      yoyo: Infinity,
      duration:0.4,
    },
  },
};
export default function Header() {
  return (
    <div>
      <Logo />

      <motion.h2
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="pink-text left title-font "
      >
        {" "}
        EpicChat
      </motion.h2>

      <Link to="/signup">
        {" "}
        <motion.button
          id='signupbtn'
          variants={btnVariants}
          whileHover="hover"
          className="btn-large  text-font waves-effect wave-light right pink"
        >
          Sign up <i className="material-icons right">last_page</i>
        </motion.button>
      </Link>

      <Link to="/login">
        <button className="btn-large  text-font waves-effect wave-light right pink lighten-3" id='loginbtn'>
          Log in
        </button>
      </Link>
    </div>
  );
}
