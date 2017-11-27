var Movie = require('../db/models/movies')

exports.all = function (req, res, next) {
    Movie.findAll(function (err, movies) {
        if (err) console.log(err)
        else {
            res.render('list', {
                title: '后台列表页',
                movies: movies
            })
        }
    })
}