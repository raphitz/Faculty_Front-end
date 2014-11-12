'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
   mongoose = require('mongoose'),
   User = mongoose.model('User'),
   Application = mongoose.model('Application');

/**
 * Globals
 */
var user, application, applicationDup;

/**
 * Unit tests
 */
describe('Application Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			application = new Application({
				name: 'Application Name',
				user: user
			});
			applicationDup = new Application({
				name: 'Application Name2',
				user: user
			});
			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save an incomplete application', function(done) {
			return application.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		//id is not of proper length
		it('should not be able to save an application with an invalid id: 123-123', function(done) { 
			application.personal_info.UFID = '123-123';

			return application.save(function(err) {
				should.exist(err);
				done();
			});
		});

		//id is alphanumeric
		it('should not be able to save an application with an invalid id: 123A-1234', function(done) { 
			application.personal_info.UFID = '123A-1234';

			return application.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should not be able to save more than one application for one student: id:1234-1234', function(done) { 
   			application.personal_info.UFID = '1234-1234';
   			application.save(function(err) {
    			should.not.exist(err);
    			applicationDup.personal_info.UFID = '1234-1234';
    			return applicationDup.save(function(err) { //tries to save an application with dup UFID
       			should.exist(err);
       			done();
    			});
   			});
  		});
	});

	// describe('End to End Integration Testing using Protractor',function(){
 //        it('should load the browser page', function(done) { 
 //        	browser.get('http://localhost:3000/#!/')
 //   			done();
 //  		});
	// });

	afterEach(function(done) { 
		Application.remove().exec();
		User.remove().exec();
		done();
	});
});