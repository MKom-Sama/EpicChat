import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import uuid from "react-uuid";
import { motion } from "framer-motion";

const ENDPOINT = "/";

// "http://localhost:5050"
export default function ChatRoom(props) {
  const { room_id } = props.match.params;

  const [room, setRoom] = useState(0);
  const [users, setUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState({});
  const [username, setUsername] = useState("GUEST");

  useEffect(() => {
    getRoomInfo();

    const socket = socketIOClient(ENDPOINT);

    setSocket(socket);
    setChatMessages([]);

    connectChatServer(socket, room_id);

    return function cleanup() {
      socket.disconnect();
      setChatMessages([]);
    };
  }, []);

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

  const roomVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getRoomInfo = () => {
    axios({
      url: `/room/${room_id}`,
      method: "GET",
    })
      .then((response) => {
        const { room } = response.data;
        setRoom(room);
      })
      .catch((err) => console.log(err));
  };

  const loading = () => {
    if (room === 0)
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

  const renderRoom = () => {
    if (room === 0) return false;

    return (
      <motion.div
        variants={roomVariants}
        initial="hidden"
        animate="visible"
        className="row card chat-room"
      >
        <div className="col l3 sidebar hide-on-small-only  ">
          <h4 className="title-font center" id="roomName">
            {room.roomName}
          </h4>
          <br />

          <ul id="user-list" className="user-list  scrollable">
            <li className="btn text-font user-list-element ">
              {" "}
              <span className="left">user</span>{" "}
              <span className="small-ball right white"></span>
              <span className="small-ball right white"></span>
              <span className="small-ball right white"></span>
            </li>
            {updateUsers(users)}
          </ul>

          <br />

          <div>
            <span className="btn disabled lighten-4 text-font left">
              <span className="black-text" id="numUsers">
                {users.length}
              </span>
              <i className="material-icons right black-text">group</i>
            </span>

            <span className="btn disabled lighten-4 text-font right">
              <a className="black-text">Lis92kx8a</a>
              <i className="material-icons right black-text">content_copy</i>
            </span>
          </div>

          <br />
          <br />

          {userNamePanel(username)}

          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="col l9 s12 chat-box-background ">
          <div className="chat-box  scrollable2" id="chat-box">
            <p className="card msg z-depth-2">
              <span className="red-text title">Name</span>
              <br />
              first message ever
            </p>

            <p className="card msg z-depth-2">
              <span className="red-text title">Name</span>
              <br />
              Hello epic stranger!
            </p>
            {updateChat(chatMessages)}
          </div>

          <form onSubmit={sendMessage} className="input-field  msg-box">
            <input id="chat-input" placeholder="send message" type="text" />
            <button className="btn pink" type="submit">
              <span className="hide-on-small-only">Send</span>
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </motion.div>
    );
  };

  /* CHAT CLIENT */

  const connectChatServer = (socket, room_id) => {
    console.log("chat server connected");

    socket.emit("room", { room_id });

    socket.on("roomUsers", (data) => {
      const { roomUsers } = data;
      console.log("users updated");
      setUsers(roomUsers);
    });

    socket.on("updateChat", (data) => {
      chatMessages.push(data);

      setChatMessages([...chatMessages]);

      scrollToBottom();
    });

    socket.on("changeUsername", (data) => {
      setUsername(data.username);
    });

    return 1;
  };
  /* CHAT CLIENT */

  const sendMessage = (e) => {
    e.preventDefault();

    let msg = e.target.elements[0].value;

    if(!isEmptyMsg(msg)) socket.emit("sendMsg", { msg, room_id });

    e.target.elements[0].value = "";
  };

  const scrollToBottom = () => {
    let chatBox = document.getElementById("chat-box");

    chatBox.scrollTop = chatBox.scrollHeight;
  };
  const updateChat = (chatMessages) => {
    let newChatMessages = chatMessages.map(({ username, msg }) => {
      return (
        <p className="card msg z-depth-2" key={uuid()}>
          <span className="red-text title">{username}</span>
          <br />
          {msg}
        </p>
      );
    });

    return newChatMessages;
  };

  const updateUsers = (users) => {
    const userList = users.map((user) => {
      return (
        <li className="btn text-font user-list-element" key={uuid()}>
          <span className="left">{user.username}</span>
          <span className="small-ball right white"></span>
          <span className="small-ball right white"></span>
          <span className="small-ball right white"></span>
        </li>
      );
    });

    return userList;
  };

  const userNamePanel = (username) => {
    return (
      <div>
        <form className="user-clicked" onSubmit={changeUsername}>
          <input
            id="changeUsername"
            className="text-font black-text center"
            type="text"
            placeholder={username}
            disabled
          />
        </form>
        <button
          className="btn-floating pink"
          onClick={(e) => {
            e.preventDefault();
            let input = document.getElementById("changeUsername");
            input.disabled = false;
          }}
        >
          <i className="material-icons right">edit</i>
        </button>
      </div>
    );
  };

  const changeUsername = (e) => {
    e.preventDefault();
    const newUsername = e.target.elements[0].value;

    socket.emit("changeUsername", { username: newUsername });

    let input = document.getElementById("changeUsername");

    input.placeholder = newUsername;

    input.disabled = true;
  };

  const isEmptyMsg = (msg) => {
    msg = msg.replace(/\s+/g, "");

    if (msg === "") return true;

    return false;
  }

  return (
    <div>
      {loading()}
      {renderRoom()}
    </div>
  );
}
