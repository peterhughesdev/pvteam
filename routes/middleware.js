var keystone = require('keystone');
var _ = require('underscore');


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
 * Compile list of partners for sidebar
 */
exports.setPartners = function(req, res, next) {
    var locals = res.locals;

    keystone.list('Partner').model.find().exec(function(err, results) {
        if (results) {
            results.forEach(function(partner) {
                partner.logoImage = '/images/uploads/partners/' + partner.logo.filename;
            });

            locals.data.partners = results;
        } else {
            locals.data.partners = [];
        }

        next(err);
    });
};

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


exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
