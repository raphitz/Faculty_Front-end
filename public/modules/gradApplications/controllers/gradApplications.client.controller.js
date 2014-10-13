'use strict';

(function() {
   
   // If you pass this function (foo, 'bar.baz', 'quux') it will execute foo.bar.baz = 'quux';
   // Creates intermediary objects along the way, too.
   function setprop(obj, path, value) {
      var i;
      var parts = path.split('.');
      for (i = 0; i < parts.length-1; i++) {
         if (!(parts[i] in obj)) {
            obj = obj[parts[i]] = {};
         }
      }
      obj[parts[parts.length-1]] = value;
   }

   function getprop(obj, path) {
       if (path == '') {
          return obj;
       }
       if (typeof obj !== 'object') {
         return undefined;
       }
       var parts = path.split('.');
       var firstaccessor = parts[0];
       parts.shift();
       obj = obj[firstaccessor];
       return getprop(obj, parts.join('.'));
   }


   // GradApplications controller
   angular.module('gradApplications').controller('GradApplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'GradApplications',
      function($scope, $stateParams, $location, Authentication, GradApplications ) {
         $scope.authentication = Authentication;

         $scope.countries = ApplicationConfiguration.countries;

         // Download a PDF summarizing the application
         $scope.downloadPDF = function() {
            alert('hello');
         };

         // Create new GradApplication
         $scope.create = function() {
            // Create new GradApplication object

            var PROPS_TO_COPY = [
               'name',
               'personal_info.UFID',
               'education_and_activities.self_reported_GPA',
            ];
            
            var obj = {};
            var i;
            var prop;

            for (i = 0; i < PROPS_TO_COPY.length; i++) {
               prop = PROPS_TO_COPY[i];
               setprop(obj, prop, getprop(this,prop));
            }

            console.log(obj);

            var gradApplication = new GradApplications (obj);

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

}());
