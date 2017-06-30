require.config({

    paths: {
        'jquery'                : 'lib/jquery-min',
        'underscore'            : 'lib/underscore-min',
        'backbone'              : 'lib/backbone-min',
        'text'                  : 'lib/require-text/text'
    },

    // non-AMD lib
    shim: {
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' }
    }

});

require([
    'jquery',
], function ($) {

});