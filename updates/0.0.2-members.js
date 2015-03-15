var keystone = require('keystone');
var Member = keystone.list('Member').model;
var Organisation = keystone.list('MemberOrganisation').model;


exports = module.exports = function(done) {
    Organisation.find().exec(function(err, results) {
        if (err) {
            done(err);
        } else {
            Member.update({}, { organisation : results[0].id }, { multi : true }, done);
        }
    });
};
