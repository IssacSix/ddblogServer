var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var salt_work = 10

var UsersSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
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

UsersSchema.pre('save', function (next) {
    var user = this
    
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(salt_work, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            user.password = hash
        })
    })
    next()
})

UsersSchema.statics.findName = function (name, cb) {
    return this.findOne({name: name}, cb)
}

module.exports = UsersSchema