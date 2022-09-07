//导入 mysql 模块
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '592592',
    database:'eleme'
})

module.exports = db