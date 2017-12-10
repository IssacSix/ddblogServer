var express = require('express')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movies')
var router = express.Router()

// User Routes
router.post('/isLogin', User.isLogin)
router.post('/signUpName', User.signUpName)
router.post('/signUp', User.signUp)
router.post('/signIn', User.signIn)

// Movies Routes
router.get('/movieList', Movie.movieList)
router.post('/creatNew', Movie.creatNew)
router.post('/movieById', Movie.movieById)

module.exports = router



