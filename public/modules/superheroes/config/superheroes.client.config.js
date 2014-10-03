'use strict';

// Configuring the Articles module
angular.module('gradApplications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'GradApplications', 'gradApplications', 'dropdown', '/gradApplications(/create)?');
		Menus.addSubMenuItem('topbar', 'gradApplications', 'List GradApplications', 'gradApplications');
		Menus.addSubMenuItem('topbar', 'gradApplications', 'New GradApplication', 'gradApplications/create');
	}
]);