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
    organisation : {
        type : Types.Text,
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
    }
});

Member.register();
