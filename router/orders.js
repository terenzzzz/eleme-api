//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入路由处理函数模块
const ordersHandler = require('../router_handler/orders_handler')

router.get('/orders', ordersHandler.orders)
router.get('/order', ordersHandler.order)
router.get('/orderDetail', ordersHandler.orderDetail)
router.post('/submitOrder', ordersHandler.submitOrder)
router.post('/submitOrderDetail',ordersHandler.submitOrderDetail)

module.exports = router