// 
// Routes file that exports route handlers for ease of testing.
// 
var sd = require('sharify').data
  , Artworks = require('../../collections/artworks');

exports.index = function(req, res, next) {
  var artworks = new Artworks();

  artworks.fetch({
    url: sd.API_URL + '/artists/jinhu-ma/artworks',
    success: function() {
      res.locals.sd.ARTWORKS = artworks.toJSON();
      res.render('index', {artworks: artworks.models});
    },
    error: function(m, err) { next(err.text); }
  })
};
