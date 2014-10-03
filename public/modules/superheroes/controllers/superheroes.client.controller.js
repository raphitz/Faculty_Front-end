'use strict';

// GradApplications controller
angular.module('gradApplications').controller('GradApplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'GradApplications',
	function($scope, $stateParams, $location, Authentication, GradApplications ) {
		$scope.authentication = Authentication;

		// Create new GradApplication
		$scope.create = function() {
			// Create new GradApplication object
			var gradApplication = new GradApplications ({
				name: this.name,
				gpa: this.gpa,
				fe: this.fe,
				gmat: this.gmat,
				gre: this.gre,
				ielts: this.ielts,
				melab: this.melab,
				toefl: this.toefl,
				tse: this.tse
			});

			// Redirect after save
			gradApplication.$save(function(response) {
				$location.path('gradApplications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GradApplication
		$scope.remove = function( gradApplication ) {
			if ( gradApplication ) { gradApplication.$remove();

				for (var i in $scope.gradApplications ) {
					if ($scope.gradApplications [i] === gradApplication ) {
						$scope.gradApplications.splice(i, 1);
					}
				}
			} else {
				$scope.gradApplication.$remove(function() {
					$location.path('gradApplications');
				});
			}
		};

		// Update existing GradApplication
		$scope.update = function() {
			var gradApplication = $scope.gradApplication ;

			gradApplication.$update(function() {
				$location.path('gradApplications/' + gradApplication._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GradApplications
		$scope.find = function() {
			$scope.gradApplications = GradApplications.query();
		};

		// Find existing GradApplication
		$scope.findOne = function() {
			$scope.gradApplication = GradApplications.get({ 
				gradApplicationId: $stateParams.gradApplicationId
			});
		};

				// Summarize an existing GradApplication
		//summarize = function(gpa, gre) {
		//	$scope.gradApplication = GradApplications.get({ 
		//		gradApplicationId: $stateParams.gradApplicationId
		//	});
		//};

	}
]);
