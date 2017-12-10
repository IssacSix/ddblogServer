var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

MovieSchema.pre('save', function(next) {
   if (this.isNew) {
       this.meta.createdAt = this.meta.updateAt = Date.now()
   } else {
       this.meta.updateAt = Date.now()
   }
   next()
})

MovieSchema.static = {
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

MovieSchema.statics.findAll = function (cb) {
    return this.find({}, cb)
}

module.exports = MovieSchema