const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body)
  res.json({ status: 'ok' });
});

module.exports = router;
