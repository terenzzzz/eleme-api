//导入 mysql 模块
const mysql = require('mysql')

const db = mysql.createPool({
    // 开发使用
    // host: '192.168.3.36',
    host: '8.134.128.178',
    //部署使用
    // host: 'xs47628438.oicp.vip',
    // port:'24706',
    user: 'nodejs',
    password: '592592',
    database:'eleme'
})

module.exports = db