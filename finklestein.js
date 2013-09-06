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
  /////////////// original expanded test
  // url
  that.isUrlMatch = function(u, msg){ 
    return assert(msg, function(){
      casper.test.assertUrlMatch(new RegExp(casper.url(u)), msg);
    });
  };
  that.isTitle = function(str, msg){ 
    return assert(msg, function(){
      casper.test.assertTitle(str, msg);
    });
  };
  that.isTitleMatch = function(pattern, msg){ 
    return assert(msg, function(){
      casper.test.assertTitleMatch(pattern, msg);
    });
  };

  // text
  that.hasText = function(str, msg){ 
    return assert(msg, function(){
      casper.test.assertTextExists(str, msg);
    });
  };
  that.hasNoText = function(str, msg){ 
    return assert(msg, function(){
      casper.test.assertTextDoesntExist(str, msg);
    });
  };

  // link 
  that.hasLink = function(href, msg){ 
    return assert(msg, function(){
      casper.test.assertExists('a[href="'+href+'"]', msg);
    });
  };
  that.hasNoLink = function(href, msg){ 
    return assert(msg, function(){
      casper.test.assertDoesntExist('a[href="'+href+'"]', msg);
    });
  };

  // Node Selector
  that.hasNode = function(selector, msg){ 
    return assert(msg, function(){
      casper.test.assertExists(selector, msg);
    });
  };
  that.hasNoNode = function(selector, msg){ 
    return assert(msg, function(){
      casper.test.assertDoesntExist(selector, msg);
    });
  };

  //////// form 
  // form input assert function
  var assertFormItem = function(type, has){
    var assertType = (has === false) ? 'assertDoesntExist' : 'assertExists';
    var t = type;
    return function(){
      var args = arguments;
      var msg = arguments[arguments.length -1];
      return assert(msg, function(){
        var selector = 'input[type="'+t+'"]';
        if(args.length > 1) selector = selector + '[name="'+args[0]+'"]';
        casper.test[assertType](selector, msg);
      });
    };
  };
  that.hasSubmit = assertFormItem('submit', true); 
  that.hasNoSubmit = assertFormItem('submit', false); 
  that.hasButton = assertFormItem('button', true); 
  that.hasNoButton = assertFormItem('button', false); 
  that.hasInputText = assertFormItem('text', true); 
  that.hasNoInputText = assertFormItem('text', false); 
  that.hasInputPassword = assertFormItem('password', true); 
  that.hasNoInputPassword = assertFormItem('password', false); 
  that.hasInputRadio = assertFormItem('radio', true); 
  that.hasNoInputRadio = assertFormItem('radio', false); 
  that.hasInputCheckbox = assertFormItem('checkbox', true); 
  that.hasNoInputCheckbox = assertFormItem('checkbox', false); 

  // form select assert function
  var assertFormItem = function(type, has){
    var assertType = (has === false) ? 'assertDoesntExist' : 'assertExists';
    var t = type;
    return function(){
      var args = arguments;
      var msg = arguments[arguments.length -1];
      return assert(msg, function(){
        var selector = t;
        if(args.length > 1) selector = selector + '[name="'+args[0]+'"]';
        casper.test[assertType](selector, msg);
      });
    };
  };
  that.hasSelect = assertFormItem('select', true); 
  that.hasNoSelect = assertFormItem('select', false); 
  that.hasTextarea = assertFormItem('textarea', true); 
  that.hasNoTextarea = assertFormItem('textarea', false); 

  // return tests
  return that;
};

module.exports = function(casper, assert){
  var F = function(){};
  F.prototype = Finklestein(casper, assert);
  return new F();
};
