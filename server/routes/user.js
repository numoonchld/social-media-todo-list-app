const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log(req.body)

  try {
    const { username, email, password } = req.body

    await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    })

    res.json({ status: 'ok' })

  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'error registering user' })
  }



});

module.exports = router;
