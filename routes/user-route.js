const express = require('express');

const router = express.Router();

router.get('/all', (req, res) => {
  res.send('<h1>router is working congrats!</h1>');
});

module.exports = router;
