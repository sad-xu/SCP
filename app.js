const https = require('https')
const http = require('http')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const path = require('path')

const index = require('./router/index')
const api = require('./router/api')

var httpsOptions = {
	key: fs.readFileSync('./https/214400255360454.key', 'utf8'),
	cert: fs.readFileSync('./https/214400255360454.pem', 'utf8')
};


mongoose.connect('mongodb://xhc:151136@localhost:27017/SCP?authSource=admin', {
	useMongoClient: true
});
mongoose.Promise = global.Promise;


const app = express();


// http -> https
app.use(function(req, res, next) {
	// http://www.expressjs.com.cn/api.html#req.protocol 	
	if (req.protocol === 'http') {
		res.redirect(301, 'https:/' + '/sadxu.top' + req.url);
		return;
	}
	next();
})


// 解析post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// 处理浏览器favicon请求
app.use(favicon(__dirname + '/src/pages/index/assets/favicon.ico'));

// 设置静态路径
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));

// 后端路由
app.use('/', index);
app.use('/api', api);


http.createServer(app).listen(80, function() {
	console.log('listening port 80')
})

https.createServer(httpsOptions, app).listen(443, function() {
	console.log('listening port 443')
})
