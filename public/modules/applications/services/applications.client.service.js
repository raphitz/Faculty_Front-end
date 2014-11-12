'use strict';

//GradApplications service used to communicate GradApplications REST endpoints
angular.module('gradApplications').factory('GradApplications', ['$resource',
	function($resource) {
		return $resource(
         'gradApplications/:gradApplicationId',
         { gradApplicationId: '@_id' },
         {
            update: {
               method: 'PUT'
            }
         }
      );
	}
]);
