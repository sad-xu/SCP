const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

/*********************** 数据库相关 ****************************/
mongoose.connect('mongodb://xhc:151136@localhost:27017/SCP?authSource=admin', {
	useMongoClient: true
});
mongoose.Promise = global.Promise;

console.log('connect success!');

const scpSchema = mongoose.Schema({
	id : { type : String, required : true },
	name : { type : String, required : true},
	level : { type : String, required : true},
	content : { type : String },
	watched : { type : Number, default : 1},
	numid : { type : Number, required : true}
});

const Scp = mongoose.model('Scp', scpSchema);


function putData(obj) {    // 放入数据库
	Scp.findOneAndUpdate(
			{ 
				numid: obj.numid
			}, {
				id: obj.id,
				name: obj.name,
				level: obj.level,
				content: obj.content,
				numid: obj.numid
			}, {
				new: true,
				upsert: true
			})
		.then(scp => console.log(scp.id + 'save ok!'))
		.catch(err => console.log(err))
} 
/**********************************************************/

// 开始爬虫
function startSpider(num) {
	let url = getUrl(num);
	if (url === false) {
		console.log('err num');
	} else {
		axios({
				method: 'get',
				baseURL: 'https://trow.cc/wiki/scp/database',
				url: url,
				headers: {
										'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0',
										'Host': 'trow.cc',
										'Upgrade-Insecure-Requests': 1,
										'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
										'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2'
									}
			})
			.then(res => {
				if (res.status === 200) {
					const $ = cheerio.load(res.data);
					let content = $('#wiki__text').val();

					let text = /======(.*)======/.exec(content)[1].split('-');

					let obj = {};
					obj.numid = num;
					obj.id = text[1].trim();
					obj.name = text[2].trim();
					obj.level = /\*{2}(项目等级：)(\*){2}(.*)/.exec(content)[3];
					obj.content = content;

					putData(obj);
				}
			})
			.catch(e => {
				console.log('err:' + url);
			});
	}
			
}


// 获取特定url
function getUrl(num) {
	let level = '';

	if (num >=1000 && num < 2000) {
			level = 'ii';
	} else if (num >=2000 && num < 3000) {
			level = 'iii';
	} else if (num >=3000 && num < 4000) {
			level = 'iv';
	} else if (num >= 100 && num < 1000) {
			level = 'i';
	} else if (num > 0 && num < 10) {
			num = '00' + num;
			level = 'i';
	} else if (num >= 10 && num < 100) {
			num = '0' + num;
			level = 'i'
	} else {
		return false;
	}
	let url = '/series-' + level + '/scp-' + num + '?do=edit';
	return url;
}



function fromAtoBspaceC(a,b,c) {
	startSpider(a);

	a++;
	if (a <= b) {
		setTimeout(function(){fromAtoBspaceC(a, b, c)}, c);
	} else {
		setTimeout(function(){ 
			mongoose.disconnect();
			console.log('over')
		}, c);
	}
}





function start() {
	setTimeout(function(){fromAtoBspaceC(2, 50, 5000)}, 1000);
}
start();