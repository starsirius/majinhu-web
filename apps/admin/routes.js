// 
// Routes file that exports route handlers for ease of testing.
// 
var fs = require('fs')
  , Artworks = require('../../collections/artworks');

exports.index = function(req, res, next) {
  var artworks = new Artworks();
  artworks.fetch({
    success: function() {
      res.locals.sd.ARTWORKS = artworks.toJSON();
      res.render('index', {artworks: artworks.models});
    },
    error: function(m, err) { next(err.text); }
  })
};

exports.uploadImage = function(req, res, next) {
  var uuid = req.body.uuid
    , version = req.body.version;

  if (!uuid) return res.send(500, 'Missing image hash');
  if (!version) return res.send(500, 'Missing image version');

  fs.readFile(req.files.image.path, function (err, data) {
    if (err) return res.send(500, err);

    var dir = __dirname + "/../../public/img/" + uuid;
    fs.mkdir(dir, function (err) {
      if (err) return res.send(500, err);

      var path = dir + "/" + version + ".jpg";
      fs.writeFile(path, data, function (err) {
        if (err) return res.send(500, err);

        return res.send('success');
      });
    });
  });
};
