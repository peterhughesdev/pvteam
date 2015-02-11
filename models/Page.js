var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
    map : { name : 'title' },
    autokey : { path : 'slug', from : 'title', unique : true }
});

Page.add({
    title : { 
        type : Types.Text, 
        required : true
    },
    header : { 
        type : Types.LocalFile, 
        dest : 'public/images/uploads/headers',
        prefix : '/images/uploads/headers',
        filename : function(page, filename) {
            var suffix = filename.substr(filename.lastIndexOf('.'));
            return page.title.toLowerCase() + '-header-' + Date.now() + suffix;
        },
        format: function(item, file){
            return '<img src="/images/uploads/headers/'+file.filename+'" style="max-width: 300px">'
        }
    },
    body : { 
        type : Types.Html, 
        wysiwyg : true, 
        height : 400 
    }
});

Page.register();
