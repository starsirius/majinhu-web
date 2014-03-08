// 
// Routes file that exports route handlers for ease of testing.
// 

exports.index = function(req, res, next) {
  var artworkId = req.params.id;
  res.locals.sd.DATA = {};
  res.render('index', {});
};
