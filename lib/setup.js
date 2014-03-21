//
// Sets up intial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//

var c = require('../config')
  , express = require('express')
  , Backbone = require('backbone')
  , sharify = require('sharify')
  , path = require('path')
  , lessMiddleware = require('less-middleware')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// Inject some constant data into sharify
sharify.data = {
  API_URL: c.API_URL,
  JS_EXT: 'production' == c.NODE_ENV ? '.min.js' : '.js',
  CSS_EXT: 'production' == c.NODE_ENV ? '.min.css' : '.css'
};

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.toJSON());
});

passport.deserializeUser(function(user, done) {
  done(null, new Backbone.Model(user));
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    var user = new Backbone.Model()
      , encodedCred = new Buffer(username+':'+password).toString('base64');

    user.url = c.API_URL + '/users/' + username;
    user.fetch({
      headers: {'Authorization' : 'Basic ' + encodedCred},
      success: function(model, response, options) {
        return done(null, model/* the user */);
      },
      error: function(model, response, options) {
        return done(null, false, { message: 'Invalid username or password' });
      }
    });
  }
));

module.exports = function(app) {

  // Override Backbone to use server-side sync
  Backbone.sync = require('backbone-super-sync');
  // Set some headers for the Github API
  Backbone.sync.editRequest = function(req) {
    req.set({ 'User-Agent': 'artsy' });
  };

  // General express middleware
  app.use(sharify);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport. Use passport.session() middleware, to support
  // persistent login sessions
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  // Development only
  if ('development' == c.NODE_ENV) {
    app.use(express.errorHandler());
    // Compile assets on request in development
    app.use(lessMiddleware(path.resolve(__dirname, '../assets'), {
      dest: path.resolve(__dirname, '../public'),
      preprocess: {
        path: function(pathname, req) {
          return pathname.replace('/css', '/less');
        }
      }
    }));
    app.use(require('stylus').middleware({
      src: path.resolve(__dirname, '../'),
      dest: path.resolve(__dirname, '../public')
    }));
    app.use(require('browserify-dev-middleware')({
      src: path.resolve(__dirname, '../assets')
    }));
  }

  // Test only
  if('test' == c.NODE_ENV) {
    // Mount fake API server
    app.use('/__api', require('../test/helpers/integration.js').api);
  }

  // Mount apps
  app.use(require('../apps/home'));
  app.use(require('../apps/artwork'));
  app.use(require('../apps/artworks'));
  app.use(require('../apps/auth'));
  app.use(require('../apps/admin'));

  // More general middleware
  app.use(express.static(path.resolve(__dirname, '../public')));
}
