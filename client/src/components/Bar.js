import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const btnVariants = {
  hover: {
    scale: 1.3,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      yoyo: Infinity,
    },
  },
};
export default function Bar() {
  return (
    <div className="bar row ">
      <ul className="tabs col s12">
        <li className="col s4 right">
          <input type="text" placeholder="search"></input>
        </li>

        <motion.li
          variants={btnVariants}
          whileHover="hover"
          className="tab col s3 left text-font underline"
        >
          <Link to="/">Home</Link>
        </motion.li>

        <motion.li
          variants={btnVariants}
          whileHover="hover"
          className="tab col s3 left text-font underline"
        >
          <Link to="/create">Create Room</Link>
        </motion.li>
      </ul>
    </div>
  );
}
