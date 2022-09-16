// 导入数据库操作模块
const db = require('../db/index')
// 导入加密模块
const bcrypt = require('bcryptjs')
const joi = require('joi')

// 导入生成 Token 字符串的包
const jwt = require('jsonwebtoken')
// 导入配置文件 
const config = require('../config')

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
    const userinfo = req.body
    const sqlQuery = `select * from users where phone=?`
    db.query(sqlQuery, userinfo.phone, function (err, results) {
        if (err) return res.cc(err)
        // 查询不到数据
        if (results.length !== 1) return res.cc('登录失败！')
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('密码错误,登录失败！')
        }
        // 密码正确
        // 剔除密码照片等信息
        const user = { ...results[0], password: '', userPic: '' }
        //生成Token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时 
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀 
            token: 'Bearer ' + tokenStr,
        })
    })
}

exports.user = (req, res) => { 
    const sqlQuery = `select id,phone,nickName,email from users where id=?`
    db.query(sqlQuery, req.query.userId, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({ status: 0, message: '获取用户基本联系信息成功！', data: results[0]})
    })
}