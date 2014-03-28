//
// Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
//

//var _ = require('underscore');
var parse = require('url').parse;

//_.mixin(require('underscore.string'));

module.exports = function(req, res, next) {

  // Allow underscore and underscore string to be used in templates
  //res.locals._ = _;

  // Inject some project-wide sharify data such as the session id, the current path
  // and the xapp token.
  res.locals.sd.XAPP_TOKEN = res.locals.xappToken;
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname

  return next();
};
