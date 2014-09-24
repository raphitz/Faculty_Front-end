'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Superhero Schema
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Superhero Schema
 */
var SuperheroSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill in the applicant&rsquo;s name',
		trim: true
	},
	gpa: {
		type: Number,
		default: -1
	},
	fe: {
		type: Number,
		default: -1
	},
	gmat: {
		type: Number,
		default: -1
	},
	gre: {
		type: Number,
		default: -1
	},
	ielts: {
		type: Number,
		default: -1
	},
	melab: {
		type: Number,
		default: -1
	},
	toefl: {
		type: Number,
		default: -1
	},
	tse: {
		type: Number,
		default: -1
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Superhero', SuperheroSchema);
