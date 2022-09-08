//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const userInfoHandler = require('../router_handler/userInfo_handler')

// 获取用户信息
router.get('/userinfo', userInfoHandler.userInfo)

// 向外共享路由对象 
module.exports = router