var keystone = require('keystone');
var Page = keystone.list('Page').model;
var Post = keystone.list('Post').model;

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
    locals.data = {};

    view.on('init', function(next) {

        Page.findOne({
                slug: 'index'
        }).exec(function(err, page) {
            locals.data.page = page;

        Post.findOne({ state : 'published' })
            .sort('-publishedDate')
            .exec(function(err, post) {
                locals.data.post = post;
                next(err);
            });
        });
    });

	// Render the view
	view.render('index');
	
};
