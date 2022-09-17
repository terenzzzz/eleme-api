// 导入数据库操作模块
const db = require('../db/index')

// 查询用户的订单
exports.orders = (req, res) => { 
    const sqlQuery = `select * from orders where userId = ?`
    db.query(sqlQuery, req.user.id, function (err, results) {
        if (err) { return res.cc(err) }
        if (results.length == 0) return res.cc('没有数据')
        res.send({
            status: 0,
            message: '获取订单信息成功！',
            data: results
        })
    })
}

// 查询用户的订单
exports.order = (req, res) => { 
    const sqlQuery = `select * from orders where id = ?`
    db.query(sqlQuery, req.query.orderId, function (err, results) {
        if (err) { return res.cc(err) }
        if (results.length == 0) return res.cc('没有数据')
        res.send({
            status: 0,
            message: '获取单个订单信息成功！',
            data: results
        })
    })
}

// 查询订单详情
exports.orderDetail = (req, res) => {
    const sqlQuery = `select * from orderdetail where orderId = ?`
    db.query(sqlQuery, req.query.orderId, function (err, results) { 
        if (err) { return res.cc(err) }
        if (results.length == 0) return res.cc('没有数据')
        res.send({
            status: 0,
            message: '获取订单信息成功！',
            orderId: req.query.orderId,
            data: results
        })
    })
}

exports.submitOrder = (req, res) => { 
    // 将数据插入orders表
    const sqlInsert = `INSERT INTO orders set ?`
    const data = {
        userId: req.user.id,
        storeId: req.body.storeId,
        total: req.body.total,
        address: req.body.address,
        paymentType: req.body.paymentType,
        status: req.body.status,
        service: req.body.service,
        pack: req.body.pack,
        postage: req.body.postage,
        createTime: new Date()
    }
    db.query(sqlInsert,data, (err, results) => {
        if (err) { return res.cc(err) }
        if (results.affectedRows === 1) { 
            return res.send({
                status: 0,
                orderId: results.insertId,
                message: '下单成功'
            })
        }
        return res.cc('下单失败')
    })
}

exports.submitOrderDetail = (req, res) => { 
    const sqlInsert = `INSERT INTO orderdetail (orderId,productId,num) VALUES ?`
    const productList = JSON.parse(req.body.productList)
    const data = []
    productList.forEach((v,i) => {
        data.push([req.body.orderId,v.product,v.num])
    });
    db.query(sqlInsert, [data], (err, results) => { 
        if (err) { return res.cc(err) }
        if (results.affectedRows >= 1) { 
            return res.send({
                status: 0,
                message: '产品下单成功'
            })
        }
        return res.cc('产品下单失败')
    })
}