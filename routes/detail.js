var Movie = require('../db/models/movies')

exports.movie = function (req, res, next) {

  var _id = req.params.id

  Movie.findById(_id, function (err, movie) {
    if (err) console.log(err)
    else {
      res.render('detail', {
        title: '电影详情',
        movie: movie
      })
    }
  })
};