// 导入数据库操作模块
const db = require('../db/index')
exports.categories = (req, res) => {
    const sqlQuery = ` select * from categories`
    db.query(sqlQuery, function (err, results) {
        if (err) {
            return res.send({status:1,message:err.message})
        }
        if (results.length > 0) {
            return res.send({
                status: 0,
                message: '获取分类信息成功',
                data: results
            })
        }
        return res.send('没有数据')
    })
}