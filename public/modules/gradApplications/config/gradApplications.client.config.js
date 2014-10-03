'use strict';

// Configuring the Articles module
angular.module('gradApplications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Graduate Applications', 'gradApplications', 'dropdown', '/gradApplications(/create)?');
		Menus.addSubMenuItem('topbar', 'gradApplications', 'List Graduate Applications', 'gradApplications');
		Menus.addSubMenuItem('topbar', 'gradApplications', 'New Graduate Application', 'gradApplications/create');
	}
]);
