// 导入数据库操作模块
const db = require('../db/index')
// 根据状态码查询状态
exports.statu = (req, res) => {
    const sqlQuery = ` select * from status where id = ?`
    db.query(sqlQuery, req.query.statuId, function (err, results) {
        if (err) {
            return res.send({status:1,message:err.message})
        }
        if (results.length > 0) {
            return res.send({
                status: 0,
                message: '获取订单状态成功',
                data: results[0]
            })
        }
        return res.send('没有数据')
    })
}
