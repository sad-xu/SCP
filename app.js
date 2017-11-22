const express = require('express')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const index = require('./router/index')
const api = require('./router/api')

mongoose.connect('mongodb://localhost:27017/SCP', {
	useMongoClient: true
});
mongoose.Promise = global.Promise;


const app = express();

// 解析post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// 处理浏览器favicon请求
app.use(favicon(__dirname + '/src/assets/favicon.ico'));

// 设置静态路径
app.use(express.static('dist'));

// 后端路由
app.use('/', index);
app.use('/api', api);


app.listen(3000, () => {
	console.log('listening port 3000');
});
