var request = require('superagent')
  , moment = require('moment');

module.exports.token = null;

module.exports = function(options) {

  var fetch = function(callback) {
    return request.get(options.apiUrl + "/xapp_token").query({
      client_id: options.clientId,
      client_secret: options.clientSecret
    }).end(function(err, res) {
      if (err) {
        return callback(err);
      }
      callback(null, res.body.token);
      return expireTokenIn(res.body.expires_in);
    });
  };

  var expireTokenIn = function(expiresIn) {
    return setTimeout((function() {
      return module.exports.token = null;
    }), moment(expiresIn).unix() - moment().unix());
  };

  return function(req, res, next) {
    if (module.exports.token == null) {
      return fetch(function(err, token) {
        console.log(token);
        res.locals.xappToken = module.exports.token = token;
        return next();
      });
    } else {
      res.locals.xappToken = module.exports.token;
      return next();
    }
  };
}
