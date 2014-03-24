var Backbone = require('backbone')
  , sd = require('sharify').data;

module.exports = Artwork = Backbone.Model.extend({

  urlRoot: sd.API_URL + '/artworks'

});
