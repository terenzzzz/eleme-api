//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const statusHandler = require('../router_handler/status_handler')

router.get('/statu', statusHandler.statu)


module.exports = router