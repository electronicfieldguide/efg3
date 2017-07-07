define([
    'underscore',
    'backbone',
    'models/key'
], function (_, Backbone, KeyModel) {
    var KeysCollection = Backbone.Collection.extend({
        model: KeyModel,
        url: 'api/keys'
    });

    return KeysCollection;
});
