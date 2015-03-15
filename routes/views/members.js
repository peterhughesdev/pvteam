var keystone = require('keystone');
var async = require('async');

var Page = keystone.list('Page').model;
var Member = keystone.list('Member').model;
var Organisation = keystone.list('MemberOrganisation').model;

var Partner = keystone.list('Partner').model;

 var _ = require('underscore');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'page';
    locals.data = {};


    function setMemberImage(member) {
        member.profileImage = member.image.filename ? 
            '/images/uploads/members/' + member.image.filename :
            '/images/profile-blank.png';
    }

    // Load organisations
    view.on('init', function(next) {
        Organisation.find()
                    .sort('order')
                    .exec(function(err, results) {
                        locals.data.organisations = results;
                        next(err);
                    });
    });

    // Grab members for each organisation
	view.on('init', function(next) {
        async.each(locals.data.organisations, function(organisation, next) {
            Member.find()
                  .sort('order name')
                  .where('organisation').in([organisation.id])
                  .exec(function(err, results) {                   
                      results.forEach(setMemberImage);
                      organisation.members = results;
                      next(err);
                  });
        }, next);
    });

    view.on('init', function(next) {
        Page.findOne({ slug : 'members' })
            .exec(function(err, page) {
                locals.data.page = page;
                next(err);
            });
    });
       
    // Render the view
	view.render('members');
}
