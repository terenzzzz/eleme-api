//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const getStores = require('../router_handler/stores_handler')

router.get('/stores', getStores.stores)
router.get('/store', getStores.store)

module.exports = router