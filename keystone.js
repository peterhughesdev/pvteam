// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'PV Team',
	'brand': 'PV Team',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.png',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

    'session store' : 'mongo',

	'cookie secret': '?NSZ~Q`Wi7{KN%+nzQ+"U]^-S$A&,`,b@&o/Oc8EcBLq;]#,mO)^p88P5BPHX>k^',

    'wysiwyg images' : true,
    'wysiwyg additional buttons' : 'searchreplace visualchars tr rtl pagebreak media  paste backcolor'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
    'pages': ['pages', 'members'],
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
