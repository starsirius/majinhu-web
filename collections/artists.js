var Backbone = require('backbone')
  , sd = require('sharify').data
  , Artist = require('../models/artist');

module.exports = Artists = Backbone.Collection.extend({
  
  model: Artist,

  url: function() {
    return sd.API_URL + '/artists';
  },

});
