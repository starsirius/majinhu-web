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
  , sd = require('sharify').data;

Backbone.$ = $;

module.exports.ArtworksView = ArtworksView = Backbone.View.extend({

});

module.exports.init = function() {
  new ArtworksView({
    el: $('body')
  });
};
