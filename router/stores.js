//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const storesHandler = require('../router_handler/stores_handler')

router.get('/stores', storesHandler.stores)
router.get('/store', storesHandler.store)

module.exports = router