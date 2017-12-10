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
    role: {
        type: Number,
        default: 0
    },
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
            next()
        })
    })
    // next()
})

UsersSchema.methods = {
    comparePassword: function (_psd, cb) {
        bcrypt.compare(_psd, this.password, function (err, isMatch) {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
}

module.exports = UsersSchema