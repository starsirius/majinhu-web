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
  , sd = require('sharify').data
  , pinyin = require('pinyin')
  , Artwork = require('../../models/artwork.js');

Backbone.$ = $;

module.exports.AdminView = AdminView = Backbone.View.extend({

  events: {
    'submit #artwork-create-form': 'submitForm'
  },

  initialize: function() {},

  submitForm: function(e) {
    e.preventDefault();

    var data = $(e.currentTarget).serializeObject()
      , artwork = new Artwork(this.transformFormData(data));

    artwork.url = sd.API_URL + "/artworks";
    artwork.save(null, {
      success: function(model, response, options) {
        if (response._status === "ERR") {
          for (var field in response._issues) {
            $('#artwork-create-error').append(
              '<div>' + field + " " + response._issues[field] + '</div>'
            );
          }
        } else {
        }
      },
      error: function(model, response, options) {
      }
    });
  },

  transformFormData: function(data) {
    var map = {
      width     : function(v) { return parseFloat(v); },
      height    : function(v) { return parseFloat(v); },
      category  : function(v) { return [v]; },
      date      : function(v) { return new Date(v).toUTCString(); }
    }

    for (var k in data) {
      if (k in map) data[k] = map[k](data[k]);
    }
    return data;
  }

});

module.exports.init = function() {
  new AdminView({
    el: $('body')
  });
};
