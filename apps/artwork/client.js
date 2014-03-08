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

var $ = require('jquery');

module.exports.init = function() {
  'use strict';

  var $body = $('body');

  function applyLayoutClasses(e, $image) {
    var threshold = 1,
        w = $image.data('width'),
        h = $image.data('height');

    if (w / h > threshold) {
      $('.artwork-image-container-left')
        .addClass('artwork-image-container-top')
        .removeClass('artwork-image-container-left');
      $('.artwork-content-container-right')
        .addClass('artwork-content-container-bottom')
        .removeClass('artwork-content-container-right');
      $('.header-container-right')
        .addClass('header-container-top')
        .removeClass('header-container-right');
    }
  }

  $body.on('image.loaded', applyLayoutClasses);

  $('.artwork-image img').load(function() {
    $(this).data('width', $(this).width());
    $(this).data('height', $(this).height());

    $body.trigger('image.loaded', [$(this)]);
  });
};
