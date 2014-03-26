// 
// Routes file that exports route handlers for ease of testing.
// 
var _         = require('underscore')
  , sd        = require('sharify').data
  , Artworks  = require('../../collections/artworks')

  // Move categories to database eventually
  , categories = [
    { english: 'plum'     , chinese: '梅'   },
    { english: 'orchids'  , chinese: '蘭'   },
    { english: 'bamboo'   , chinese: '竹'   },
    { english: 'mums'     , chinese: '菊'   },
    { english: 'wisteria' , chinese: '紫藤' },
    { english: 'peony'    , chinese: '牡丹' },
    { english: 'magnolia' , chinese: '玉蘭' }
  ];

exports.index = function(req, res, next) {
  var artworks = new Artworks();

  artworks.fetch({
    url: sd.API_URL + '/artists/jinhu-ma/artworks',
    success: function() {
      res.locals.sd.ARTWORKS = artworks.toJSON();
      res.render('index', { artworks: artworks.models, categories: categories });
    },
    error: function(m, err) { next(err.text); }
  });
};

exports.category = function(req, res, next) {
  var artworks = new Artworks()
    , category
    , apiUrl = sd.API_URL + '/artists/jinhu-ma/artworks'
    , filter = '?where={"category":"' + req.params.category + '"}'

  rest = _.reject(categories, function(c) {
    if (c.english == req.params.category) category = c;
    return c.english == req.params.category;
  });

  artworks.fetch({
    url: apiUrl + filter,
    success: function() {
      res.locals.sd.ARTWORKS = artworks.toJSON();
      res.render('index', {
        artworks    : artworks.models,
        category    : category,
        categories  : rest
      });
    },
    error: function(m, err) { next(err.text); }
  });
};
