'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var gradApplications = require('../../app/controllers/gradApplications');

	// GradApplications Routes
	app.route('/gradApplications')
		.get(gradApplications.list)
		.post(users.requiresLogin, gradApplications.create);

	app.route('/gradApplications/:gradApplicationId')
		.get(gradApplications.read)
		.put(users.requiresLogin, gradApplications.hasAuthorization, gradApplications.update)
		.delete(users.requiresLogin, gradApplications.hasAuthorization, gradApplications.delete);

	// Finish by binding the GradApplication middleware
	app.param('gradApplicationId', gradApplications.gradApplicationByID);
};