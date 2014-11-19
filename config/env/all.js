'use strict';

module.exports = {
	app: {
		title: 'Admissions',
		description: 'Admissions application for graduates',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/ng-table/ng-table.css',
				'public/lib/angular-sticky-table-header/dist/angular-sticky-table-header.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/pdfmake/build/pdfmake.min.js',
				'public/lib/pdfmake/build/vfs_fonts.js',
				'public/lib/ng-table/ng-table.js',
				'public/lib/watch-dom/dist/watch-dom.js',
				'public/lib/lodash/dist/lodash.js',
				'public/lib/angular-sticky-table-header/dist/angular-sticky-table-header.js',
				'public/dist/browserify.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/globalfunc.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
