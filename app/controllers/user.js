var Users = require('../db/models/users')

// 判断是否已经登录
exports.isLogin = function (req, res, next) {
    var _user = req.session.user
    if (_user) {
        res.json({
            dec: 'success',
            code: '200',
            msg: _user.name
        })
    }
}

// 注册
exports.signUpName = function (req, res, next) {
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
}

exports.signUp = function (req, res, next) {
    var _user = req.body

    var user = new Users(_user)
    user.save(function (err, user) {
        if (err) console.log(err)
        res.json({
            dec: 'success',
            code: '200',
            msg: user.name
        })
    })
}

// 登录
exports.signIn = function (req, res, next) {
    var _user = req.body

    Users.findOne({ name: _user.name }, function (err, user) {
        if (err) console.log(err)

        if (user) {
            user.comparePassword(_user.password, function (err, isMatch) {
                if (err) console.log(err)

                if (isMatch) {
                    req.session.user = user
                    res.json({
                        dec: 'success',
                        code: '200',
                        msg: user.name
                    })
                } else {
                    res.json({
                        dec: 'fail',
                        code: '201',
                        msg: '登录失败'
                    })
                }
            })
        } else {
            res.json({
                dec: 'fail',
                code: '201',
                msg: '登录失败'
            })
        }
    })
}

// 登出
exports.logout = function (req, res, next) {
    delete req.session.user
    res.json({
        dec: 'success',
        code: '200',
        msg: '退出登录'
    })
}

// 登录权限
exports.signInRequire = function (req, res, next) {
    var _user = req.session.user
    if (!_user) {
        return 
    }
    next()
}

// 管理权限
exports.adminReruire = function (req, res, next) {
    var _user = req.session.user
    if (_user.role <= 5) {
        return
    }
    next()
}