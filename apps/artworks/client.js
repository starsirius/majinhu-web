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
  , BlackInkGallery = require('black-ink-gallery');

Backbone.$ = $;

module.exports.ArtworksView = ArtworksView = Backbone.View.extend({

  events: {
    "mouseover .scroll-button-left, .scroll-button-right" : "scrolling",
    "mouseout .scroll-button-left, .scroll-button-right"  : "stopScrolling"
  },

  initialize: function() {
    this.setupContainer(); // need to set the container's height before initializing blackInkGallery
    this.$('#gallery').blackInkGallery();
    this.setupScrolling();
  },

  render: function() {
  },

  setupContainer: function() {
    var $container = $('#artworks > .container');

    if ($('body')[0].style["-webkit-writing-mode"] != undefined) {
      // $.height() set the content's height regardless of box-sizing
      // so we have to set the height before adding the class.
      $container.height(this.getWindowHeight())
        .addClass('vertical-rl');
    }
  },

  setupScrolling: function() {
    if (navigator.userAgent.match(/(iPad|iPhone)/i)) {
      this.$('.scroll-button-left, .scroll-button-right').hide();
    }
  },

  scrolling: function(e) {
    var interval = 10
      , velocity = 10
      , $button  = $(e.currentTarget);

    if (this.scrollingId != null) return;

    this.scrollingId = setInterval(function() {
      left = $('.vertical-rl').scrollLeft();

      if ($button.hasClass("scroll-button-left")) {
        $('.vertical-rl').scrollLeft(left - velocity);
      }
      if ($button.hasClass("scroll-button-right")) {
        $('.vertical-rl').scrollLeft(left + velocity);
      }
    }, interval);
  },

  stopScrolling: function(e) {
    if (this.scrollingId != null) {
      clearInterval(this.scrollingId);
      this.scrollingId = null;
    }
  },

  // Re: http://stackoverflow.com/questions/8205812/jquery-js-ios-4-and-document-height-problems
  getWindowHeight: function() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area.
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
  },

    // You can also get height of the toolbars that are currently displayed
  getHeightOfIOSToolbars: function() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) -  getWindowHeight();
    return tH > 1 ? tH : 0;
  }
});

module.exports.init = function() {
  new ArtworksView({
    el: $('body')
  });
};
