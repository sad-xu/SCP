const mongoose = require('mongoose')

const scpSchema = mongoose.Schema({
	id: { type : String, required : true },
	name: { type : String, required : true},
	level : { type : String, required : true},
	content : { type : String },
	watched : { type : Number, default : 0}
});

const Scp = mongoose.model('Scp', scpSchema);

module.exports = Scp;