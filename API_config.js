var express = require('express');
var cors = require('cors');
var router = express.Router();
var _ = require('underscore')
var Movie = require('./db/models/movies')
var Users = require('./db/models/users')

var app = express()

app.use(cors())

// 注册

app.post('/signUpName', function (req, res, next) {
	var _userName = req.body.name

	Users.find({ name: _userName }, function (err, user) {
		if (err) console.log(err)

		if (user.length > 0) {
			res.json({
				dec: 'fail',
				code: '201',
				msg: '该用户名已存在'
			})
		} else {
			res.json({
				dec: 'success',
				code: '200',
				msg: '可正常注册'
			})
		}
	})
})

app.post('/signUp', function (req, res, next) {
	var _user = req.body
	
	var user = new Users(_user)
	user.save(function (err, user){
		if (err) console.log(err)
		res.json({
			dec: 'success',
			code: '200',
			msg: user.name
		})
	})

})

app.get('/test', function (req, res, next) {
	res.json({
		title: 'dingding'
	})
})

// 电影列表页面
app.get('/movieList', function (req, res, next) {

    Movie.findAll(function (err, movie) {
        res.json({
            dec: 'success',
            code: 200,
            msg: movie
        })
    })
})

// 管理 创建新电影
app.post('/creatNew', function (req, res, next) {

    var data = req.body
    var id = data._id
		var _movie

    if (!id) {
        _movie = new Movie({
            title: data.title,
            doctor: data.doctor,
            country: data.country,
            language: data.language,
            poster: data.poster,
            flash: data.flash,
            summary: data.summary
        })
        _movie.save(function (err, movie) {
			if (err) console.log(err)
			res.json({
				dec: 'success',
				code: 200,
				msg: {
					id: movie._id
				}
			})
        })
    } else {
			Movie.findById(id, function(err, movie) {
				if(err) console.log(err)
				else {
					_movie = _.extend(movie, data)
					_movie.save(function (err, movie) {
						if (err) console.log(err)
					})
				}
			})
			res.json({
				dec: 'success',
				code: 200,
				msg: {
					id: id
				}
			})
		}
})

// 根据id获取电影
app.post('/movieById', function (req, res, next) {

	var _id = req.body.id

	Movie.findById(_id, function (err, movie) {
		if (err) console.log(err)
		else {
			res.json({
				dec: 'success',
				code: 200,
				msg: movie
			})
		}
	})
})


module.exports = app