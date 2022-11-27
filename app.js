// 导入 express 模块 
const express = require('express')
//导入定义验证规则的包
const joi = require('joi')
// 创建 express 的服务器实例 
const app = express()
// 导入 cors 中间件 
const cors = require('cors')
// 将 cors 注册为全局中间件 
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件 
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情 况 
    res.cc = function (err, status = 1) {
        res.send({
            // 状态 
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入配置文件 
const config = require('./config')
// 解析 token 的中间件 
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
// 将用户信息挂载到res.body.user上
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

//分类模块
const categoriesRouter = require('./router/categories')
app.use('/api', categoriesRouter)

//店铺模块
const storesRouter = require('./router/stores')
app.use('/api', storesRouter)

//菜单模块
const menuRouter = require('./router/menu')
app.use('/api',menuRouter)

//登录模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//用户信息模块
const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

//功能模块
const functionsRouter = require('./router/functions')
app.use('/api', functionsRouter)

// 订单模块
const ordersRouter = require('./router/orders')
app.use('/my', ordersRouter)

// 状态模块
const statusRouter = require('./router/status')
app.use('/my', statusRouter)

// 用户信息更改
const settingRouter = require('./router/setting')
app.use('/my', settingRouter)

// 错误级别中间件
app.use((err,req,res,next)=>{
    // 数据验证失败 
    if (err.name === 'ValidationError') return res.cc(err)
    // 捕获身份认证失败的错误 
    if (err.name === 'UnauthorizedError') {
        return res.send({
          status: 401,
          message: '无效的token',
        })
      }
    // 未知错误 
    return res.cc(err)
})

// write your code here...
// 调用 app.listen 方法，指定端口号并启动web服务器
// # use alternate localhost and the port Heroku assigns to $PORT
部署使用
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

//开发使用
// const host = '127.0.0.1'; 
// const port = process.env.PORT || 3007;

app.listen(port, host, function () {
    console.log('api server running at http://' + host + ':' + port)
})