var express = require('express');
var router = express.Router();

var index = require('./routes/index');
var detail = require('./routes/detail');
var admin = require('./routes/admin');
var list = require('./routes/list');
var movieNew = require('./routes/new');

// 首页
router.get('/', index.list);

// 详情页
router.get('/movie/:id', detail.movie);

// 录入页
router.get('/admin/movies', admin.index);

// 列表页
router.get('/admin/list', list.all);

// 新增中间页
router.post('/admin/movie/new', movieNew.newOne); 

module.exports = router;
