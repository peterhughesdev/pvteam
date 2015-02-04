var keystone = require('keystone');
var Page = keystone.list('Page').model;
var Member = keystone.list('Member').model;

 var _ = require('underscore');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'page';
    locals.data = {};
	
    // Load the page 
	view.on('init', function(next) {
        // Grab all member objects
	    Member.find()
              .sort('name')
              .exec(function(err, results) {

                  // Group members based on organisation
                  locals.data.members = _.groupBy(results, 'organisation');

                  // And now grab the page
                  Page.findOne({ slug : 'members' })
                      .exec(function(err, page) {
                          locals.data.page = page;
                          next(err);
                      });
              });
    });

    // Render the view
	view.render('members');
}
