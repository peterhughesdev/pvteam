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
        allowedTypes : ['image/jpeg', 'image/png'],
        dest:' ~/website/uploads/headers',
        prefix : '/headers/',
        format: function(item, file){
            return '<img src="/headers/'+file.filename+'" style="max-width: 300px">'
        }
    },
    body : { 
        type : Types.Html, 
        wysiwyg : true, 
        height : 400 
    }
});

Page.register();
