define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var KeyModel = Backbone.Model.extend({
        urlRoot: '/api/key'
    });

    return KeyModel;
});