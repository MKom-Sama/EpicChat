
const Room = require("../models/room");

const updateNumOfUsersOnDB = async (roomID,roomUsersLength) => {
    
    try {
        const room = await Room.findById(roomID);
    
        room.numUsers = roomUsersLength;

        room.save();
        
      }
      catch (err) {
        console.log(err);
      }
}

module.exports = {updateNumOfUsersOnDB}