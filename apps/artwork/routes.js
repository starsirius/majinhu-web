// 
// Routes file that exports route handlers for ease of testing.
// 
var sd = require('sharify').data
  , Artwork = require('../../models/artwork');

exports.index = function(req, res, next) {
  var artwork = new Artwork({id: req.params.id});

  artwork.fetch({
    success: function() {
      res.locals.sd.ARTWORK = artwork.toJSON();
      res.render('index', { artwork: artwork });
    },
    error: function(m, err) { next(err.text); }
  })
};
