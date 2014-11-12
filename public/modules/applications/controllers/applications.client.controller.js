'use strict';

(function() {
   
   function generatePdfDoc(app) {
      function p(prop) {
         var value = getprop(app, prop, '');
         if (value === undefined) {
            return '';
         }
         return ''+value;
      }

      function country(prop) {
         var code = getprop(app, prop, undefined);
         if (code === '') {
            return '';
         }
         return ApplicationConfiguration.countriesByCode[code];
      }

      var testScores = [
         ['FE',    p('education_and_activities.test_scores.FE')],
         ['GMAT',  p('education_and_activities.test_scores.GMAT')],
         ['GRE',   p('education_and_activities.test_scores.GRE')],
         ['IELTS', p('education_and_activities.test_scores.IELTS')],
         ['MELAB', p('education_and_activities.test_scores.MELAB')],
         ['TOEFL', p('education_and_activities.test_scores.TOEFL')],
         ['TSE',   p('education_and_activities.test_scores.TSE')],
      ];

      var name = p('personal_info.name.first') + ' ' + p('personal_info.name.last');

      var dd = {
         content: [
            { text: 'Graduate Application for ' + name, style: 'header' },
            '',
            { text: 'Personal Info', style: 'subheader' },
            {
               style: 'tableExample',
               table: {
                  body: [
                     ['First Name', 'Middle Name', 'Last Name'],
                     [p('personal_info.name.first'), p('personal_info.name.middle'), p('personal_info.name.last')]
                  ]
               }
            },
            {
               style: 'tableExample',
               table: {
                  body: [
                     ['UFID', p('personal_info.UFID')],
                     [
                        'Nation of citizenship',
                        country('personal_info.nation_of_citizenship')
                     ]
                  ]
               }
            },
            { text: 'Education and activities', style: 'subheader' },
            { text: 'Test scores', style: 'subsubheader' },
            {
               style: 'tableExample',
               table: {
                     body: testScores
               }
            }
         ],
         styles: {
            header: {
               fontSize: 18,
               bold: true,
               margin: [0, 0, 0, 10]
            },
            subheader: {
               fontSize: 16,
               bold: true,
               margin: [0, 10, 0, 5]
            },
            subsubheader: {
               fontSize: 13,
               bold: true,
               margin: [0, 10, 0, 5]
            },
            tableExample: {
               margin: [0, 5, 0, 15]
            },
            tableHeader: {
               bold: true,
               fontSize: 13,
               color: 'black'
            }
         },
         defaultStyle: {
            // alignment: 'justify'
         }
         
      };
      return dd;
   }


   // GradApplications controller
   angular.module('gradApplications').controller('GradApplicationsController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'GradApplications',
      function($scope, $stateParams, $location, $modal, Authentication, GradApplications ) {


         //Tabs

      
        $scope.tabs = [
          { title:'Dynamic Title 1', content:'Dynamic content 1' },
          { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];

        $scope.alertMe = function() {
          setTimeout(function() {
            alert('You\'ve selected the alert tab!');
          });
        };
      

         //End of tabs functions



         
         $scope.getprop = getprop;

         $scope.authentication = Authentication;

         $scope.countries = ApplicationConfiguration.countries;

         // Download a PDF summarizing the application
         $scope.downloadPDF = function() {
            var doc = generatePdfDoc(this.gradApplication);
            pdfMake.createPdf(doc).open();
         };

         // Create new GradApplication
         $scope.create = function() {
            // Create new GradApplication object

            var PROPS_TO_COPY = [
               'personal_info.name.first',
               'personal_info.name.middle',
               'personal_info.name.last',
               'personal_info.nation_of_citizenship',
               'personal_info.UFID',
               'education_and_activities.self_reported_GPA',
               'education_and_activities.test_scores.FE',
               'education_and_activities.test_scores.GMAT',
               'education_and_activities.test_scores.GRE',
               'education_and_activities.test_scores.IELTS',
               'education_and_activities.test_scores.MELAB',
               'education_and_activities.test_scores.TOEFL',
               'education_and_activities.test_scores.TSE',
            ];
            
            var obj = {};
            var i;
            var prop;

            for (i = 0; i < PROPS_TO_COPY.length; i++) {
               prop = PROPS_TO_COPY[i];
               setprop(obj, prop, getprop(this,prop));
            }

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

         $scope.viewPage = function() {
            var application = this.gradApplication;

            $modal.open({
               templateUrl: 'myModalContent.html',
               controller: 'ModalInstanceCtrl',
               size: 'lg',
               resolve: {
                  application: function () {
                     return application;
                  }
               }
            });

         };

               // Summarize an existing GradApplication
         //summarize = function(gpa, gre) {
         //	$scope.gradApplication = GradApplications.get({ 
         //		gradApplicationId: $stateParams.gradApplicationId
         //	});
         //};

      }
   ])
   .controller('ModalInstanceCtrl', function ($scope, $modalInstance, application) {
      $scope.application = application;

      $scope.close = function () {
         $modalInstance.dismiss('close');
      };
   })
   ;

}());
