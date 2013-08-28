
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.form = function(req, res){
  res.render('index', { title: 'form' });
};

exports.done = function(req, res){
  res.render('index', { title: 'done' });
};
