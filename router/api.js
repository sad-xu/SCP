const express = require('express')
const Scp = require('../models/scp')
const Admin = require('../models/admin')

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


/********* 登陆页接口 ***********/
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

module.exports = router;