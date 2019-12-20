const mongoose = require('mongoose');

const { Schema } = mongoose;

const certificateSchema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true,
        lowercase: true,
        unique: true,
	},
	url: {
		type: String,
        unique: true,
        trim: true,
        required: true,
	},
	
});

// create mongoose model
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;