var express = require('express')
  , swig    = require('swig')
  , routes  = require('./routes');

var app = module.exports = express();

app.engine('html', swig.renderFile);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.set('view cache', false);
swig.setDefaults({ cache: false });

swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/../../components/global/templates') });

app.get('/artwork/:id', routes.index);
