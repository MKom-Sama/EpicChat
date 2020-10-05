import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Rooms() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const roomVariants = {
    hidden: {
      y: "100vh",
    },
    visible: {
      y: 0,
      transition: {
        staggerChildren: 0.8,
        duration: 1,
        type: "spring",
        damping: 40,
      },
    },
  };

  const btnVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.1,
      },
    },
  };

  /*  FOR THE LOADING ANIMATIONS */

  const loadingVariants = {
    hidden: {
      y: 0,
      opacity: 0,
    },
    visible: {
      y: [-12, 0],
      opacity: 1,
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  /*  FOR THE LOADING ANIMATIONS */
  useEffect(() => {
    getAllRooms();

    // in production uncomment this (updates rooms every sec)
    //const updatingRooms = setInterval(getAllRooms, 1000);

    return function cleanup() {
      //clearInterval(updatingRooms);
    };
  }, []);

  const [rooms, setRooms] = useState([]);

  const getAllRooms = async () => {
    axios({
      url: "/room/getall",
      method: "GET",
    })
      .then((result) => {
        setRooms(result.data);
        return result.data;
      })
      .catch((err) => console.log(err));
  };

  const renderRooms = (rooms) => {
    if (rooms.length === 0) return;

    const roomList = rooms.map((room) => (
      <motion.li className="card room" variants={roomVariants} key={room._id}>
        <div className="card-content">
          <div className="card-title title-font">{room.roomName}</div>
          <div>
            <span className="btn disabled lighten-4 text-font">
              <span className="black-text">{room.numUsers}</span>
              <i className="material-icons right black-text">group</i>
            </span>

            <Link to={`/room/${room._id}`}>
              <motion.span
                variants={btnVariants}
                whileHover="hover"
                className="btn pink lighten-1 right title-font"
              >
                Join
                <i
                  className="material-icons white-text room-icons right"
                  data-tooltip="let me in!"
                >
                  keyboard_tab
                </i>
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.li>
    ));
    return (
      <motion.ul
        id="roomList"
        initial="hidden"
        animate="visible"
        className="container"
        variants={containerVariants}
      >
        {roomList}
      </motion.ul>
    );
  };

  const loading = () => {
    if (rooms.length === 0)
      return (
        <motion.p
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container loading-container"
        >
          <br />
          <br />
          <br />

          <motion.td variants={loadingVariants} className="loading-ball pink" />
          <motion.td variants={loadingVariants} className="loading-ball pink" />
          <motion.td variants={loadingVariants} className="loading-ball pink" />
        </motion.p>
      );
    else return;
  };

  return (
    <div>
      {loading()}

      {renderRooms(rooms)}
    </div>
  );
}
