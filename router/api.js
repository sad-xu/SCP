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
		{ id: req.body.id },
		{
			id: req.body.id,
			name: req.body.name,
			level: req.body.level,
			content: req.body.content
		}, 
		{
			new : true,
			upsert: true
		})
		.then(scp => res.json(scp))
		.catch(err => res.json(err))
});

// 删除
router.delete('/deletescp/:id', (req, res) => {
	let id = req.params.id;
	Scp.findOneAndRemove({ id : id})
			.then(scp => res.send(`${scp.id}删除成功`))
			.catch(err => res.json(err))
});

// 根据id获取具体信息
router.get('/scp/:id', (req, res) => {
	Scp.findOne({id: req.params.id})
		  .then(scp => {
		  	res.json(scp)
		  })
		  .catch(err => {
		  	res.json(err)
		  })
});

// 获取项目列表 (所有)
router.get('/list', (req, res) => {
	Scp.find({},['id', 'name'])
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