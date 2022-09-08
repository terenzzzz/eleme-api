//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const functionsHandler = require('../router_handler/functions_handler')

router.get('/functions', functionsHandler.functions)

module.exports = router