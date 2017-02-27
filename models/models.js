var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TrafficlistSchema = new Schema({
	density: {
		type: Number,
		required: true
	},
	interval: {
		type:  Number, 
		required: true 
	}
}, {timestamps: true});

var model = mongoose.model('Trafficlist', TrafficlistSchema);

module.exports = model;