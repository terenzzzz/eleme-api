// 用户信息验证规则模块
// 导入定义验证规则模块
const joi = require('joi')

/*** string() 值必须是字符串 
 * * alphanum() 值只能是包含 a-zA-Z0-9 的字符串 
 * * min(length) 最小长度 * max(length) 最大长度 
 * * required() 值是必填项，不能为 undefined 
 * * pattern(正则表达式) 值必须符合正则表达式的规则 
 * */

// 手机号验证规则
const phone = joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/)
// 密码验证规则
// 8-16个字符，至少1个大写字母，1个小写字母和1个数字
const password = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)


// 注册和登录表单的验证规则对象 
exports.user_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: { phone, password},
}