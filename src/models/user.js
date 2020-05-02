const mongoose = require('../db/mongoose');

const User = mongoose.model('User', 
	{
		name: {
			type: String,
			required:true,
			trim:true
		},
		age: {
			type: Number,
			trim:true,
			min:18,
			default:18
		} 
	},
);

module.exports = User;