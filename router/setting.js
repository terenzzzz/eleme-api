//导入express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入验证表单数据的中间件 
const expressJoi = require('@escook/express-joi')
// 导入处理函数
const settingHandler = require('../router_handler/setting_handler')
// 导入需要的验证规则对象
const { password_schema } = require('../schema/password')
const { email_schema } = require('../schema/email')
const { nickName_schema } = require('../schema/nickName')

// 修改昵称
router.post('/editNickname',expressJoi(nickName_schema), settingHandler.editNickname)
// 修改生日
router.post('/editBirth', settingHandler.birth)
// 修改密码
router.post('/editPassword', expressJoi(password_schema), settingHandler.password)
// 修改邮箱
router.post('/editEmail', expressJoi(email_schema), settingHandler.email)

// 向外共享路由对象 
module.exports = router