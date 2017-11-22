const express = require('express')
const Scp = require('../models/scp')

const router = express.Router()


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

// 修改
router.put('/editscp/:id', (req, res) => {
	Scp.findOneAndUpdate(
		{ id: req.params.id },
		{ $set: {
							level : req.body.level,
							content : req.body.content
						}
		}, {
			new : true
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

// get all
router.get('/all', (req, res) => {
	res.send('all geted!');
});


module.exports = router;