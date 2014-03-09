var Backbone = require('backbone')
  , sd = require('sharify').data
  , Artwork = require('../models/artwork');

module.exports = Artworks = Backbone.Collection.extend({
  
  model: Artwork,

  url: function() {
    return sd.API_URL + '/artworks';
  },

});
