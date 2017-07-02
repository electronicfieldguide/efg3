require.config({

    paths: {
        'jquery'                : 'lib/jquery.min',
        'underscore'            : 'lib/underscore-min',
        'backbone'              : 'lib/backbone-min',
        'text'                  : 'lib/require-text',
        'raphael'               : 'lib/raphael',
        'treant'                : 'lib/treant'
    },

    // non-AMD lib
    shim: {
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' },
        'treant'                : { deps : ['raphael', 'jquery'], exports : 'Treant' }
    }

});

require([
    'jquery',
    'collections/keys',
    'views/keys'
], function ($, KeysCollection, KeysView) {
    var view = new KeysView({collection: new KeysCollection()});
});