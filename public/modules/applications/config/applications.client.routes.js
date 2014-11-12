'use strict';

//Setting up route
angular.module('applications').config(['$stateProvider',
	function($stateProvider) {
		// Applications state routing
		$stateProvider.
		state('team', {
			url: '/team',
			templateUrl: 'modules/applications/views/team.client.view.html'
		}).
		state('listApplications', {
			url: '/applications',
			templateUrl: 'modules/applications/views/list-applications.client.view.html'
		}).
		state('createApplication', {
			url: '/applications/create',
			templateUrl: 'modules/applications/views/create-application.client.view.html'
		}).
		state('editApplication', {
			url: '/applications/:applicationId/edit',
			templateUrl: 'modules/applications/views/edit-application.client.view.html'
		});
	}
]);
