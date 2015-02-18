var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Partner = new keystone.List('Partner', {
    map : { name : 'name' }
});

Partner.add({
    name : {
        type : Types.Text,
        required : true
    },
    url : {
        type : Types.Text
    },
    logo : {
        type : Types.LocalFile,
        dest : 'public/images/uploads/partners',
        prefix : '/images/uploads/partners',
        filename : function(partner, filename) {
            var suffix = filename.substr(filename.lastIndexOf('.'));
            return 'partner-logo-' + Date.now() + suffix;
        },
        format : function(item, file) {
            return '<img src="/images/uploads/partners/' + file.filename + '" style="max-width: 300px;">';
        }
    }
});

Partner.register();




