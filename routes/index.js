const express = require('express');
const router = express.Router();

//create the route for GET at the root(index) folder//
router.get('/', (req, res) => {
  res.render('index');
});

//export so the router can be imported into the app//
module.exports = router;
