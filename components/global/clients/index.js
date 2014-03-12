//
// The client-side code for the main layout.
//

var Backbone = require('backbone');

Backbone.$ = $;

module.exports = function() {
  setupJquery();
}

setupJquery = function() {
  require('../../../lib/jquery/form.js');
}
