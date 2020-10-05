const express = require("express");

const router = express.Router();

const Room = require("../models/room");
/*Routes that start with /room */


router.post("/create", (req, res) => {
    const room = req.body;

    const newRoom = new Room(room);

  newRoom
    .save()
    .then(() => {
      res.send("room created");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/getall', (req, res) => {
    Room.find().then(result => {
        res.json(result)
    })
})


router.get('/:room_id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.room_id);

    res.send({room})
    
  }
  catch (err) {
    console.log(err);
  }
 
  
})

module.exports = router;
