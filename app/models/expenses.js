var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var expenses   = new Schema({
	description: String,
	date: Date,
	amount: Number
});

module.exports = mongoose.model('Expenses', expenses);