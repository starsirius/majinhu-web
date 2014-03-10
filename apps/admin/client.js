//
// The client-side code for the commits page.
//
// [Browserify](https://github.com/substack/node-browserify) lets us write this
// code as a common.js module, which means requiring dependecies instead of
// relying on globals. This module exports the Backbone view and an init
// function that gets used in /assets/commits.js. Doing this allows us to
// easily unit test these components, and makes the code more modular and
// composable in general.
//

var Backbone = require('backbone')
  , $ = require('jquery')
  , sd = require('sharify').data
  , pinyin = require('pinyin')
  , Artwork = require('../../models/artwork.js');

Backbone.$ = $;

module.exports.AdminView = AdminView = Backbone.View.extend({

  initialize: function() {
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $('#artwork-create-form').submit(function(e) {
      e.preventDefault();

      var data = $(e.currentTarget).serializeObject()
        , artwork = new Artwork(data);

      artwork.url = "http://localhost:5000/artwork";
      artwork.save(null, {
        success: function(model, response, options) {
        },
        error: function(model, response, options) {
        }
      });
    });
  }
});

module.exports.init = function() {
  new AdminView({
    el: $('body')
  });
};
