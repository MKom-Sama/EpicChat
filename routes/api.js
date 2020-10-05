const express = require('express');

const router = express.Router();

/*Routes*/

router.get('/', (req, res) => {
    res.json('haha');
})



module.exports = router; 