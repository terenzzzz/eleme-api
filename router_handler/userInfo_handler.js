// 导入数据库操作模块
const db = require('../db/index')

// 获取用户信息
exports.userInfo = (req, res) => {
    const sqlQuery = `select id,phone,nickName,email,birth,userPic,giftCard,redPack,voucher from users where id=?`
    db.query(sqlQuery, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({ status: 0, message: '获取用户基本信息成功！', data: results[0]})
    })
}
