//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const menuHandler = require('../router_handler/menu_handler')

router.get('/menu', menuHandler.menu)

router.get('/product', menuHandler.product)

module.exports = router