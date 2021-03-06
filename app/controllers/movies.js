var _ = require('underscore')
var Movie = require('../db/models/movies')

// 电影列表页面
exports.movieList = function (req, res, next) {
    Movie.findAll(function (err, movie) {
        res.json({
            dec: 'success',
            code: 200,
            msg: movie
        })
    })
}

// 管理 创建新电影
exports.creatNew = function (req, res, next) {

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
        Movie.findById(id, function (err, movie) {
            if (err) console.log(err)
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
}

// 根据id获取电影
exports.movieById = function (req, res, next) {

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
}

