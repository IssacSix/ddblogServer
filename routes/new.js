var express = require('express')
var router = express.Router()
var Movie = require('../db/models/movies')

exports.newOne = function (req, res, next) {
    var data = req.body.formLabelAlign
    var id = data.id
    var _movie

    if (id === 'undefined') {
        _movie = new Movie({
            title: data.title,
            doctor: data.doctor,
            country: data.country,
            language: data.language,
            url: data.url,
            flash: data.flash,
            summary: data.summary
        })

        _movie.save(function (err, movie) {
            if (err) console.log(err)
            res.redirect('/movie/' + movie._id)
        })
    } else {
        console.log('更新原有数据')
    }
}