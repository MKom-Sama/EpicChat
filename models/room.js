const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Structuring the Schema

const roomsSchema = new Schema(
  {
    // property : {constraints}

    roomName: {
      type: String,
    },
    numUsers: {
      type: Number,
      default:0,
    },
  },

  { timestaps: true }
);

const Room = mongoose.model("Rooms", roomsSchema);

// Exporting the Model

module.exports = Room;
