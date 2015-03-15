var keystone = require('keystone');
var Types = keystone.Field.Types;

var MemberCategory = new keystone.List('MemberOrganisation', {
    autokey : { from : 'name', path : 'key' }
});

MemberCategory.add({
    name : { 
        type : Types.Text,
        required : true
    },
    order : {
        type : Types.Number
    }
});

MemberCategory.relationship({ ref : 'Member', path : 'organisation' });

MemberCategory.register();
