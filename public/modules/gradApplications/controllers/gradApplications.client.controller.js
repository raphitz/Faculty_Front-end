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
       if (path === '') {
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


   function generatePdfDoc(gradApplication) {
      var dd = {
         content: [
                  { text: 'Graduate Application for ...', style: 'header' },
                  '',
                  { text: 'Personal Info', style: 'subheader' },
                  {
                        style: 'tableExample',
                        table: {
                              body: [
                                    ['First Name', 'Middle Name', 'Last Name'],
                                    ['John', 'C', 'Adams']
                              ]
                        }
                  },
                  {
                        style: 'tableExample',
                        table: {
                              body: [
                                    ['UFID', '22291234'],
                                    ['Country of citizenship', 'Antarctica']
                              ]
                        }
                  },
                  { text: 'Education and activities', style: 'subheader' },
                  { text: 'Test scores', style: 'subsubheader' },
                  {
                        style: 'tableExample',
                        table: {
                              body: [
                                    ['Column 1', 'Column 2', 'Column 3'],
                                    [
                                          {
                                                stack: [
                                                      'Let\'s try an unordered list',
                                                      {
                                                            ul: [
                                                                  'item 1',
                                                                  'item 2'
                                                            ]
                                                      }
                                                ]
                                          },
                                          [
                                             'or a nested table',
                                             {
                                                table: {
                                                   body: [
                                                      [ 'Col1', 'Col2', 'Col3'],
                                                      [ '1', '2', '3'],
                                                      [ '1', '2', '3']
                                                   ]
                                                },
                                             }
                                          ],
                                          { text: [
                                                'Inlines can be ',
                                                { text: 'styled\n', italics: true },
                                                { text: 'easily as everywhere else', fontSize: 10 } ]
                                          }
                                    ]
                              ]
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
   angular.module('gradApplications').controller('GradApplicationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'GradApplications',
      function($scope, $stateParams, $location, Authentication, GradApplications ) {
         $scope.authentication = Authentication;

         $scope.countries = ApplicationConfiguration.countries;

         // Download a PDF summarizing the application
         $scope.downloadPDF = function() {
            var doc = generatePdfDoc(this);
            pdfMake.createPdf(doc).open();
         };

         // Create new GradApplication
         $scope.create = function() {
            // Create new GradApplication object

            var PROPS_TO_COPY = [
               'name',
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
               $location.path('gradApplications');

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
