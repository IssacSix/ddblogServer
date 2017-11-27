var Movie = require('../db/models/movies')

exports.list = function (req, res, next) {

  Movie.findAll(function (err, movie) {
    res.render('index', {
      title: 'movies 首页',
      movies: movie
    })
  })

};

