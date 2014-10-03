'use strict';

(function() {
	// GradApplications Controller Spec
	describe('GradApplications Controller Tests', function() {
		// Initialize global variables
		var GradApplicationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the GradApplications controller.
			GradApplicationsController = $controller('GradApplicationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one GradApplication object fetched from XHR', inject(function(GradApplications) {
			// Create sample GradApplication using the GradApplications service
			var sampleGradApplication = new GradApplications({
				name: 'New GradApplication'
			});

			// Create a sample GradApplications array that includes the new GradApplication
			var sampleGradApplications = [sampleGradApplication];

			// Set GET response
			$httpBackend.expectGET('gradApplications').respond(sampleGradApplications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gradApplications).toEqualData(sampleGradApplications);
		}));

		it('$scope.findOne() should create an array with one GradApplication object fetched from XHR using a gradApplicationId URL parameter', inject(function(GradApplications) {
			// Define a sample GradApplication object
			var sampleGradApplication = new GradApplications({
				name: 'New GradApplication'
			});

			// Set the URL parameter
			$stateParams.gradApplicationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/gradApplications\/([0-9a-fA-F]{24})$/).respond(sampleGradApplication);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gradApplication).toEqualData(sampleGradApplication);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GradApplications) {
			// Create a sample GradApplication object
			var sampleGradApplicationPostData = new GradApplications({
				name: 'New GradApplication'
			});

			// Create a sample GradApplication response
			var sampleGradApplicationResponse = new GradApplications({
				_id: '525cf20451979dea2c000001',
				name: 'New GradApplication'
			});

			// Fixture mock form input values
			scope.name = 'New GradApplication';

			// Set POST response
			$httpBackend.expectPOST('gradApplications', sampleGradApplicationPostData).respond(sampleGradApplicationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the GradApplication was created
			expect($location.path()).toBe('/gradApplications/' + sampleGradApplicationResponse._id);
		}));

		it('$scope.update() should update a valid GradApplication', inject(function(GradApplications) {
			// Define a sample GradApplication put data
			var sampleGradApplicationPutData = new GradApplications({
				_id: '525cf20451979dea2c000001',
				name: 'New GradApplication'
			});

			// Mock GradApplication in scope
			scope.gradApplication = sampleGradApplicationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/gradApplications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gradApplications/' + sampleGradApplicationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gradApplicationId and remove the GradApplication from the scope', inject(function(GradApplications) {
			// Create new GradApplication object
			var sampleGradApplication = new GradApplications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new GradApplications array and include the GradApplication
			scope.gradApplications = [sampleGradApplication];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/gradApplications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGradApplication);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gradApplications.length).toBe(0);
		}));
	});
}());