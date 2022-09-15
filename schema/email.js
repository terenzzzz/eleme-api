// 导入定义验证规则模块
const joi = require('joi')

// 邮箱验证规则
const email = joi.string().email().required()

// 修改密码的验证规则对象 
exports.email_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: { email},
}