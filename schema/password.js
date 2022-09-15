// 导入定义验证规则模块
const joi = require('joi')

const newPwd = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)
const oldPwd = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)

// 修改密码的验证规则对象 
exports.password_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: { newPwd, oldPwd},
}