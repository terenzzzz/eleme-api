// 导入数据库操作模块
const db = require('../db/index')

// 查询用户的订单
exports.orders = (req, res) => { 
    const sqlQuery = `select * from orders where userId = ?`
    db.query(sqlQuery, req.user.id, function (err, results) {
        if (err) { return res.cc() }
        if (results.length == 0) return res.cc('没有数据')
        res.send({
            status: 0,
            message: '获取订单信息成功！',
            data: results
        })
    })
}

// 查询订单详情
exports.orderDetail = (req, res) => {
    const sqlQuery = `select * from orderdetail where orderId = ?`
    db.query(sqlQuery, req.query.orderId, function (err, results) { 
        if (err) { return res.cc() }
        if (results.length == 0) return res.cc('没有数据')
        res.send({
            status: 0,
            message: '获取订单信息成功！',
            data: results
        })
    })
}