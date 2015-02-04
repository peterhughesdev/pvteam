var keystone = require('keystone'),
    Page = keystone.list('Page').model;

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

    req.params.page = req.params.page || 'index';

	// Set locals
	locals.section = 'page';
	locals.filters = {
		page : req.params.page
	};

    locals.data = {};
	
    // Load the page 
	view.on('init', function(next) {
		Page.findOne({
			slug: locals.filters.page
        }).exec(function(err, page) {
            locals.data.page = page;
            next(err);
        });
	});

    // Render the view
	view.render('page');
};
