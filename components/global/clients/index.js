//
// The client-side code for the main layout.
//

var Backbone = require('backbone')
  , sd       = require('sharify').data;

Backbone.$ = $;

module.exports = function() {
  setupJquery();
}

setupJquery = function() {
  require('../../../lib/jquery/form.js');
  $.ajaxSettings.headers = {
    Authorization: 'Basic ' + btoa(sd.XAPP_TOKEN + ":")
  };
}
