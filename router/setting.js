//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const settingHandler = require('../router_handler/setting_handler')

// 修改昵称
router.post('/editNickname', settingHandler.editNickname)
// 修改生日
router.post('/editBirth', settingHandler.birth)

// 向外共享路由对象 
module.exports = router