//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const getmenu = require('../router_handler/menu_handler')

router.get('/menu/:storeId', getmenu.menu)

module.exports = router