const express = require('express')
const Scp = require('../models/scp')
const Admin = require('../models/admin')
const User = require('../models/user')

const router = express.Router()


/*
// 增加
router.post('/addscp', (req, res) => {
	Scp.create(req.body, (err, scp) => {
		if (err) {
			res.json(err);
		} else {
			res.json(scp);
		}
	})
});
*/
// 修改
router.post('/editscp', (req, res) => {
	Scp.findOneAndUpdate(
		{ numid: req.body.numid },
		{
			id: req.body.id,
			name: req.body.name,
			level: req.body.level,
			content: req.body.content,
			numid: req.body.numid
		}, 
		{
			new : true,
			upsert: true
		})
		.then(scp => res.json(scp))
		.catch(err => res.json(err))
});

// 删除
router.delete('/deletescp/:numid', (req, res) => {
	let numid = req.params.numid;
	Scp.findOneAndRemove({ numid : numid})
			.then(scp => res.send(`${scp.numid}删除成功`))
			.catch(err => res.json(err))
});

// 根据id获取具体信息
router.get('/scp/:numid', (req, res) => {
	let query = Scp.where({numid: req.params.numid});
			query.update({$inc: {watched: 1}})
				.then(data => {
					if (data.ok) {
						query.findOne()
						  .then(scp => {
						  	if (scp === null) {
						  		res.json({id:'',numid:0,name:'***',level:'',content:'',watched:0})
						  	} else {
						  		res.json(scp);
						  	}	
						  })
						  .catch(err => {
						  	res.json(err);
						  })
					}
				})
				.catch(err => {
					res.json(err);
				})	
});

// 获取项目列表 (a ~ b)
router.get('/list', (req, res) => {
	let from = req.query.from,
			to = req.query.to;

	Scp.find({}, ['id', 'name', 'numid', 'watched'])
			.where('numid').gte(from).lte(to)
			.sort({'numid':1})
		.then(scp => {
		 	res.json(scp);
		})
		.catch(err => {
		 	res.json(err);
		})
})


/********* 后台登陆页接口 ***********/
router.post('/login', (req, res) => {
	Admin.findOne({name: req.body.name})
				.then(admin => {
					if (admin.password === req.body.password) {
						res.json({err:0})
					} else {
						res.json({err:1})
					}
				})
				.catch(err => {
					res.json({err:1})
				})
})


/************* 移动端登陆接口  **************/
router.post('/user/login', (req, res) => {  // 登陆
	console.log(req.body)
	User.findOne({myname: req.body.myname})
			.then(user => {
				if (user.mypassword) {
					if (user.mypassword === req.body.mypassword)
					res.json(user);
				} else {
					res.json({err:1})
				}
			})
			.catch(err => {
				console.log(err)
				res.json(err);
			})
});

router.post('/user/signup', (req, res) => {  // 注册
	// req.body.mypassword 防止用户名重复
	// req.body.email  防止Email重复
	// 添加
	User.create({myname: req.body.myname,mypassword: req.body.mypassword, email: req.body.email})
			.then(user => {
				res.json(user)
			})
			.catch(err => {
				res.json(err)
			})
});
/****************************************************/

/***************** 收藏接口 ***********************/
router.post('/user/setcollect', (req, res) => {  // 修改收藏数据
	User.updateOne(
		{ myname: req.body.myname },
		{ collect: req.body.collect})
			.then(user => {
				res.json(user)
			})
			.catch(err => {
				res.json(err)
			})
})

router.get('/user/getcollect', (req, res) => {  // 获取收藏列表
	let arr = req.query.arr.split(',');
	Scp.find({numid:{$in:arr}}, ['id', 'name', 'numid', 'watched'])
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.json(err)
		})
})




module.exports = router;