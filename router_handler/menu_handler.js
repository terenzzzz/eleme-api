// 导入数据库操作模块
const db = require('../db/index')

// 查询单个商店的菜单
exports.menu = (req, res) => {
    const sqlQuery = `SELECT * FROM menus WHERE storeId = ?;`
    db.query(sqlQuery, req.query.storeId, function (err, results) { 
        if (err) {
            return res.send({status:1,message:err.message})
        }
        if (results.length > 0) {
            return res.send({
                status: 0,
                message: '获取商店信息成功',
                data: results
            })
        }
        return res.send('没有数据')
    })
}

// 查询单个产品
exports.product = (req, res) => {
    const sqlQuery = ` select * from menus where id = ?`
    db.query(sqlQuery, req.query.productId, function (err, results) {
        if (err) {
            return res.send({status:1,message:err.message})
        }
        if (results.length > 0) {
            return res.send({
                status: 0,
                message: '获取产品信息成功',
                data: results
            })
        }
        return res.send('没有数据')
    })
}