// 导入数据库操作模块
const db = require('../db/index')
// 导入加密模块
const bcrypt = require('bcryptjs')

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

// 更新密码
exports.password = (req, res) => { 
    const sqlQuery = `select * from users where id = ?` 
    db.query(sqlQuery, req.user.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length > 0) {
            //判断原密码是否正确
            const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
            if (!compareResult) return res.cc('原密码不正确')
            // 更新密码
            //加密密码
            const newpwd = bcrypt.hashSync(req.body.newPwd, 10)
            const sqlUpdate = `update users set password = ? where id = ?`
            db.query(sqlUpdate, [newpwd, req.user.id], (err, results) => {
                if (err) return res.cc(err.message)
                if (results.affectedRows === 1) {
                    return res.send({
                        status: 0,
                        message: '修改密码成功'
                    })
                }
                return res.cc('修改失败')
            })
        }
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

