'use strict';

// vim: ts=3:noet:sw=3:ai:si

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	GradApplication = mongoose.model('GradApplication'),
	_ = require('lodash');

/**
 * Create a GradApplication
 */
exports.create = function(req, res) {
	var gradApplication = new GradApplication(req.body);
	gradApplication.user = req.user;

	gradApplication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradApplication);
		}
	});
};

/**
 * Show the current GradApplication
 */
exports.read = function(req, res) {
	res.jsonp(req.gradApplication);
};

/**
 * Update a GradApplication
 */
exports.update = function(req, res) {
	var gradApplication = req.gradApplication ;

	gradApplication = _.extend(gradApplication , req.body);

	gradApplication.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradApplication);
		}
	});
};

/**
 * Delete an GradApplication
 */
exports.delete = function(req, res) {
	var gradApplication = req.gradApplication ;

	gradApplication.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradApplication);
		}
	});
};

/**
 * List of GradApplications
 */
exports.list = function(req, res) { GradApplication.find().sort('-created').populate('user', 'displayName').exec(function(err, gradApplications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gradApplications);
		}
	});
};

/**
 * GradApplication middleware
 */
exports.gradApplicationByID = function(req, res, next, id) { GradApplication.findById(id).populate('user', 'displayName').exec(function(err, gradApplication) {
		if (err) return next(err);
		if (! gradApplication) return next(new Error('Failed to load GradApplication ' + id));
		req.gradApplication = gradApplication ;
		next();
	});
};

/**
 * GradApplication authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gradApplication.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
