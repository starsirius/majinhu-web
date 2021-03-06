var express = require('express')
  , swig    = require('swig')
  , routes  = require('./routes');

var app = module.exports = express();

app.engine('html', swig.renderFile);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);

// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/../../components/global/templates') });

app.get('/admin', ensureAuthenticated, routes.index);
app.post('/admin/artwork/image', routes.uploadImage);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
