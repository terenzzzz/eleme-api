// 导入数据库操作模块
const db = require('../db/index')

exports.editNickname = (req, res) => { 
    const sqlUpdate = `update users set nickName = ? where id = ?`
    db.query(sqlUpdate, [req.body.nickName, req.user.id], (err, results) => {
        if(err) return res.cc(err.message)
        if (results.affectedRows===1){
            return res.send({
                status: 0,
                message:'更新昵称成功'
            })
        }
        return res.cc('更新失败')
    })
}

exports.birth = (req, res) => { 
    const sqlUpdate = `update users set birth = ? where id = ?`
    db.query(sqlUpdate, [req.body.birth, req.user.id], (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows === 1) {
            return res.send({
                status: 0,
                message: '更新生日成功'
            })
        }
        return res.cc('更新失败')
    })
}

exports.email = (req, res) => { 
    const sqlUpdate = `update users set email = ? where id = ?`
    db.query(sqlUpdate, [req.body.email, req.user.id], (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows === 1) {
            return res.send({
                status: 0,
                message: '更新邮箱成功'
            })
        }
        return res.cc('更新失败')
    })
}

