//导入 mysql 模块
const mysql = require('mysql')

const db = mysql.createPool({
    // host: '192.168.3.36',
    host: 'xs47628438.oicp.vip',
    user: 'terence',
    password: '592592',
    database:'eleme'
})

module.exports = db