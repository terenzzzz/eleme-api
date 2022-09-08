//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const categoriesHandler = require('../router_handler/categories_handler')

router.get('/categories', categoriesHandler.categories)

module.exports = router