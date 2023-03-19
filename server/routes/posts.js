const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const Post = require('../models/post.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res, next) => {

    try {

        const allPosts = await Post.find({})

        if (allPosts) res.json({
            status: 'ok',
            allPosts: allPosts.reverse(),
        })

        else res.json({
            status: 'error',
            error: 'error finding to-dos!'
        })


    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            error: 'error getting todos!'
        })
    }
});

router.get('/user-posts', async (req, res, next) => {
    const token = req.headers['x-access-token']
    try {

        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)

        const { email } = decodedJWT
        const user = await User.findOne({ email })

        if (user) {

            const allUserPosts = await Post.find({
                author: user._id,
            })

            if (allUserPosts) res.json({
                status: 'ok',
                allUserPosts: allUserPosts.reverse(),
            })

            else res.json({
                status: 'error',
                error: 'error finding to-dos!'
            })

        }
        else res.json({
            status: 'error',
            error: 'user not found!'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            error: 'error getting todos!'
        })
    }
});

router.post('/', async (req, res, next) => {
    const token = req.headers['x-access-token']
    try {

        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = decodedJWT
        const user = await User.findOne({ email })

        if (user) {

            const { postText } = req.body
            console.log({ postText })
            const newPost = await Post.create({
                author: user._id,
                text: postText
            })

            if (newPost) res.json({
                status: 'ok',
                post: newPost,
            })

            else res.json({
                status: 'error',
                error: 'error adding post!'
            })

        }
        else res.json({
            status: 'error',
            error: 'user not found!'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            error: 'error getting todos!'
        })
    }
});

module.exports = router;