// 
// Routes file that exports route handlers for ease of testing.
// 

exports.index = function(req, res, next) {
  res.locals.sd.DATA = {};
  res.render('index', {});
};

exports.submitLogin = function(req, res, next) {
  res.locals.sd.DATA = {};
  res.redirect('/admin');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
