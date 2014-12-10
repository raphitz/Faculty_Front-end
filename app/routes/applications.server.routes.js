'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var applications = require('../../app/controllers/applications');

	// Applications Routes
	app.route('/applications')
		.get(users.requiresLogin, applications.list)
		.post(users.requiresLogin, applications.create);

	app.route('/applications/:applicationId')
		.get(users.requiresLogin, applications.read);

	app.route('/applications/:applicationId/comments')
      .post(users.requiresLogin, applications.hasAuthorization, applications.createComment);


	// Finish by binding the Application middleware
	app.param('applicationId', applications.applicationByID);
};
