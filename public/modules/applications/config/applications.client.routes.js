'use strict';

//Setting up route
angular.module('gradApplications').config(['$stateProvider',
	function($stateProvider) {
		// GradApplications state routing
		$stateProvider.
		state('team', {
			url: '/team',
			templateUrl: 'modules/gradApplications/views/team.client.view.html'
		}).
		state('listGradApplications', {
			url: '/gradApplications',
			templateUrl: 'modules/gradApplications/views/list-gradApplications.client.view.html'
		}).
		state('createGradApplication', {
			url: '/gradApplications/create',
			templateUrl: 'modules/gradApplications/views/create-gradApplication.client.view.html'
		}).
		state('editGradApplication', {
			url: '/gradApplications/:gradApplicationId/edit',
			templateUrl: 'modules/gradApplications/views/edit-gradApplication.client.view.html'
		});
	}
]);
