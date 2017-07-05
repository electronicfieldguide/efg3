define([
    'underscore',
    'backbone',
    'views/key'
], function (_, Backbone, KeyView) {
   var KeysView = Backbone.View.extend({
       el: '#container',

       events: {
           'change .key-select': 'keySelected'
       },

       initialize: function () {
           this.listenTo(this.collection, 'update', this.render);
           this.collection.fetch();
       },

       render: function () {
           this.$keySelect = this.$('.key-select');

           this.collection.each(function (key) {
               var $option = $('<option>')
                   .attr('value', key.get('id'))
                   .html(key.get('name'));

               this.$keySelect.append($option);
           }, this);

           /*$(window).mousemove(function (e) {
                   var x = $(window).innerHeight() - 50,
                       y = $(window).scrollTop() + 50;
                   console.log(e.pageY);
                   if (e.pageY > x) {
                       //Down
                       $('html, body').animate({
                           scrollTop: 300 // adjust number of px to scroll down
                       }, 600);
                   }
                   if (e.pageY < y) {
                       //Up
                       $('html, body').animate({
                           scrollTop: 0
                       }, 600);
                   } else {
                       $('html, body').animate({

                       });
                   }
               });*/

           return this;
       },

       keySelected: function (evt) {
            var id = evt.target.value;

            var key = this.collection.get(id);
            var view = new KeyView({model: key});
       }
   });

   return KeysView;
});