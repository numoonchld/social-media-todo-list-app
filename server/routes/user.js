const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* get users listing. */
router.get('/', async (req, res, next) => {

  const token = req.headers['x-access-token']
  console.log(req.body)

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    const { email } = decodedJWT
    const user = await User.findOne({ email })

    if (user) {

      const allUsers = await User.find({})

      res.json({
        status: 'ok',
        allUsers
      })
    }

    else {
      res.json({
        status: 'error',
        error: "could not retrieve all users"
      })
    }

  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'error getting user' })
  }

});

// get user by ID 
router.get('/:userID', async (req, res, next) => {
  const token = req.headers['x-access-token']

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    const { email } = decodedJWT
    const user = await User.findOne({ email })

    if (user) {

      const { userID } = req.params

      const userInfo = await User.findById(userID)

      if (userInfo) {
        res.json({
          status: 'ok',
          userInfo
        })
      }

      else {
        res.json({
          status: 'error',
          error: 'could not retrieve user'
        })
      }
    }

  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'error registering user' })
  }

});

// get entire user profile by ID 
router.get('/user-profile/:userID', async (req, res, next) => {

  const token = req.headers['x-access-token']

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    const { email } = decodedJWT
    const user = await User.findOne({ email })

    if (user) {

      const { userID } = req.params

      const userInfo = await User.findById(userID)

      if (userInfo) {
        res.json({
          status: 'ok',
          userInfo
        })
      }

      else {
        res.json({
          status: 'error',
          error: 'could not retrieve user'
        })
      }
    }

  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'error registering user' })
  }

});

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
