/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'News',		key: 'news',		href: '/news' },
		{ label: 'Members',		key: 'members',		href: '/members' },
        { label: 'Technology',  key: 'technology',  href: '/technology' },
        { label: 'Publications', key: 'publications', href: '/publications' },
        { label: 'Vacancies',   key: 'vacancies', href: '/vacancies' }
	];
	
	locals.user = req.user;
	
	next();
	
};

/**
 *
 * Set the header image.
 */
exports.setHeader = function(req, res, next) {
    var locals = res.locals;

    if (locals.data.page && locals.data.page.header.filename) {
        locals.data.header = '/images/uploads/headers/' + locals.data.page.header.filename; 
    } else {
        locals.data.header = 'http://i.imgur.com/Eourq.jpg';
    }

    next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
