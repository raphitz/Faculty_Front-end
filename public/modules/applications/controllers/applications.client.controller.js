'use strict';

(function() {


   
   // Applications controller
   angular.module('applications').controller('ApplicationsController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Applications',
      function($scope, $stateParams, $location, $modal, Authentication, Applications ) {

         function columnSpecShorthand() {
            var name, shortname, producer;
            var VISIBLE_BY_DEFAULT = [
               'Name',
               'Active Veteran',
               'Applied Before',
               'Self-reported GPA'
            ];
            if (arguments.length === 2) {
               name = shortname = arguments[0];
               producer = arguments[1];
            }
            if (arguments.length === 3) {
               name = arguments[0];
               shortname = arguments[1];
               producer = arguments[2];
            }

            return {
               name: name,
               shortname: shortname,
               producer: producer,
               visible: VISIBLE_BY_DEFAULT.indexOf(name) !== -1
            };
         }

         $scope.columns = [
            columnSpecShorthand(
               'Name',
               function() {
                  return this.personal_info.name.first + " " + this.personal_info.name.last;
               }
            ),
            columnSpecShorthand(
               'First Name',
               function() {
                  return this.personal_info.name.first;
               }
            ),
            columnSpecShorthand(
               'Last Name',
               function() {
                  return this.personal_info.name.last;
               }
            ),
            columnSpecShorthand(
               'Active Veteran',
               function() {
                  return this.personal_info.veteran_status.active_veteran ? 'Y' : 'N';
               }
            ),
            columnSpecShorthand(
               'Applied Before',
               function() {
                  return this.personal_info.previous_application ? 'Y' : 'N';
               }
            ),
            columnSpecShorthand(
               'Self-reported GPA',
               'GPA',
               function() {
                  return this.education_and_activities.self_reported_GPA.GPA;
               }
            ),

         ];

         $scope.getColumnValueForApplication = function(column, application) {
            return column.producer.call(application);
         };
         
         $scope.getprop = getprop;

         $scope.authentication = Authentication;

         $scope.countries = ApplicationConfiguration.countries;

         // Remove existing Application
         $scope.remove = function( application ) {
            if ( application ) { application.$remove();

               for (var i in $scope.applications ) {
                  if ($scope.applications [i] === application ) {
                     $scope.applications.splice(i, 1);
                  }
               }
            } else {
               $scope.application.$remove(function() {
                  $location.path('applications');
               });
            }
         };

         // Update existing Application
         $scope.update = function() {
            var application = $scope.application ;

            application.$update(function() {
               $location.path('applications/' + application._id);
            }, function(errorResponse) {
               $scope.error = errorResponse.data.message;
            });
         };

         // Find a list of Applications
         $scope.find = function() {
            $scope.applications = Applications.query();
         };

         // Find existing Application
         $scope.findOne = function() {
            $scope.application = Applications.get({ 
               applicationId: $stateParams.applicationId
            });
         };

         $scope.viewPage = function() {
            var application = this.application;

            $modal.open({
               templateUrl: 'modules/applications/views/modal/single-application.html',
               controller: 'ModalInstanceCtrl',
               size: 'lg',
               resolve: {
                  application: function () {
                     return application;
                  }
               }
            });

         };

         $scope.configColumns = function() {
            $modal.open({
               templateUrl: 'modules/applications/views/modal/configure-columns.html',
               controller: 'ColumnSelectorController',
               size: 'sm',
               scope: $scope,
               resolve: {
               }
            });
         };

      }
   ])
   .controller('ModalInstanceCtrl', function ($scope, $modalInstance, application) {
      $scope.application = application;

      $scope.close = function () {
         $modalInstance.dismiss('close');
      };
   })
   .controller('ColumnSelectorController', function($scope, $modalInstance, $window) {
      
      $scope.updateColumns = function() {
         $window.alert('woo');
      };

      $scope.close = function () {
         $modalInstance.dismiss('close');
      };
   })
   ;

}());
