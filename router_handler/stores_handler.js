// 导入数据库操作模块
const db = require('../db/index')
// 查询所有商店
exports.stores = (req, res) => {
    const sqlQuery = ` select * from stores`
    db.query(sqlQuery, function (err, results) {
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

// 查询单个商店的菜单
exports.store = (req, res) => {
    const sqlQuery = `SELECT * FROM stores WHERE id = ?;`
    db.query(sqlQuery, req.query.id, function (err, results) { 
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