const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const cookieParser = require("socket.io-cookie-parser");

const app = express();

const PORT = process.env.PORT || 6060;
const DB_URI =
  process.env.DB_URI ||
  "mongodb+srv://user:ERBCKc5UNND6U10w@cluster0.c9mjj.mongodb.net/Debater?retryWrites=true&w=majority";

// Routes
const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/user_api");
const roomRoutes = require("./routes/room_api");

// Middleware

/*

// This is supposed to do something but its ruining my life

const whitelist = ["http://localhost:3000", "https://braintalk.herokuapp.com"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin of request : ${origin}`);

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log(`Origin accepted`);
      callback(null, true);
    } else {
      console.log(`Origin rejected`);
      callback(new Error("Not Allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

*/

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

// Functions

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/userFunctions");

const { updateNumOfUsersOnDB } = require("./utils/roomFunctions");

const { verifyAccessToken } = require("./utils/authorization");
const { use } = require("./routes/api");
const server = app.listen(PORT, console.log(`listening to PORT : ${PORT}`));

// Connecting to the database

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // 
    if (process.env.NODE_ENV === "production") {
  

      app.use(express.static(path.join(__dirname, "client/build")));

 
    }

    console.log("connected to the database");

    app.use("/api", apiRoutes);
    app.use("/user", userRoutes);
    app.use("/room", roomRoutes);

    if (process.env.NODE_ENV === "production") {
      console.log('entered');
      app.get('/', (req, res) => {
        const index = path.join(__dirname, "client", "build", "index.html");
        res.sendFile(index);
      });
    }

    /* CHAT SERVER */

    const io = socketIo(server);

    io.use(cookieParser());

    let roomID = null;

    io.on("connection", (socket) => {
      console.log("socket connection made");

      socket.on("room", async (data) => {
        const { Access_Token } = socket.request.cookies;
        const { room_id } = data;
        socket.join(room_id);

        try {
          const ifUserIsLoggedIn = await verifyAccessToken(Access_Token);

          const { username, email } = ifUserIsLoggedIn;

          socket.emit("changeUsername", { username: username });

          roomID = room_id;

          const user = userJoin(socket.id, username, roomID);

          let roomUsers = getRoomUsers(roomID);

          io.sockets.in(roomID).emit("roomUsers", { roomUsers });

          updateNumOfUsersOnDB(roomID, roomUsers.length);
        } catch (err) {
          console.log(err);
        }
      });

      socket.on("sendMsg", (data) => {
        const { msg, room_id } = data;

        const user = getCurrentUser(socket.id);

        io.sockets
          .in(room_id)
          .emit("updateChat", { username: user.username, msg });
      });

      socket.on("changeUsername", (data) => {
        userLeave(socket.id);

        userJoin(socket.id, data.username, roomID);

        let roomUsers = getRoomUsers(roomID);

        io.sockets.in(roomID).emit("roomUsers", { roomUsers });
      });

      socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        console.log("user left the site ");

        let roomUsers = getRoomUsers(roomID);
        io.sockets.in(roomID).emit("roomUsers", { roomUsers });
        updateNumOfUsersOnDB(roomID, roomUsers.length);
      });
    });
  })
  .catch((err) => {
    console.log("didnt connect to the database");
    console.log(err);
  });
