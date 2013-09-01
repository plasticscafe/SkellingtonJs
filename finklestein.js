var Finklestein = function(casper, assert){
  var that = that || {};
  // expands casper tester
  var tests = ['assert', 'assertDoesntExist', 'assertEqual', 'assertEval', 'assertEvalEquals',
      'assertElementCount', 'assertExists', 'assertFalsy', 'assertField', 'assertHttpStatus',
      'assertMatch', 'assertNot', 'assertNotEquals', 'assertNotVisible', 'assertRaises',
      'assertSelectorDoesntHaveText', 'assertSelectorHasText', 'assertResourceExists',
      'assertTextExists', 'assertTextDoesntExist', 'assertTitle', 'assertTitleMatch',
      'assertType', 'assertUrlMatch', 'assertVisible'];
  for(var t in tests){
    that[tests[t]] = (function(){ 
      var test = tests[t];
      return function(){
        var args = arguments;
        assert(args[args.length -1], function(){
          casper.test[test].apply(casper.test, args);
        });
      };
    })();
  }
  // original expanded test
  that.isUrlMatch = function(u, msg){ 
    return assert(msg, function(){
      casper.test.assertUrlMatch(new RegExp(casper.url(u)), msg);
    });
  };
  return that;
};

module.exports = function(casper, assert){
  var F = function(){};
  F.prototype = Finklestein(casper, assert);
  return new F();
};
