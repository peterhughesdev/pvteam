var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Member = new keystone.List('Member', {
    map : { name : 'name' },
    autokey : { path : 'slug', from : 'name', unique : true }
});

Member.add({
    name : { 
        type : Types.Text, 
        required : true
    },
    order : {
        type : Types.Number
    },
    organisation : {
        type : Types.Relationship,
        ref : 'MemberOrganisation',
        many : false
    },
    job_title : {
        type : Types.Text,
    },
    location : {
        type : Types.Text
    },
    email : {
        type : Types.Email
    },
    website : {
        type : Types.Url
    },
    image : {
        type : Types.LocalFile,
        dest : 'public/images/uploads/members',
        prefix : '/images/uploads/members',
        filename : function(member, filename) {
            var suffix = filename.substr(filename.lastIndexOf('.'));
            return 'member-profile-' + Date.now() + suffix; 
        },
        format : function(item, file) {
            return '<img src="/images/uploads/members/' + file.filename + '" style="max-width: 300px">';
        }
    }
});

Member.register();
