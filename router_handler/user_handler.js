// 导入数据库操作模块
const db = require('../db/index')
// 导入加密模块
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.register = (req, res) => {
    const userinfo = req.body
    // 判断是否为空
    if (!userinfo.phone || !userinfo.password) {
        return res.send({status:1,message:'手机号或密码不能为空'})
    }
    // 检测是否被占用
    const sqlQuery = `select * from users where phone = ?`
    db.query(sqlQuery, [userinfo.phone], function (err, result) {
        if (err) {
            return res.send({status:1,message: err.message})
        }
        // 手机号被占用
        if (result.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 手机号可以使用
        // 加密密码
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 添加到数据库
        const sqlInsert = `insert into users set ?`
        db.query(sqlInsert, { phone: userinfo.phone, password: userinfo.password }, function (err, result) {
            if (err) res.send({ status: 1, message: err.message })
            if (result.affectedRows !== 1) {
                res.cc('注册用户失败，请稍后再试')
            }
            res.send({ status: 0, message: '注册成功' })
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('OK')
}