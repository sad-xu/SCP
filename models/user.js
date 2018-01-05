const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	myname: {type: String, reuqired: true},
	mypassword: {type: String, requires: true},
	email: {type: String, default: ''},
	collect: {type: String, default: ''}
});

const User = mongoose.model('User', userSchema);

module.exports = User; 