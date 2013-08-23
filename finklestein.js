var Finklestein = function(casper, assert){
  var that = that || {};
  // expands casper tester
  that.assert = function(bool, msg){ 
    return assert(msg, function(){
      casper.test.assert(bool, msg);
    });
  };
  that.assertDoesntExist = function(selector, msg){ 
    return assert(msg, function(){
      casper.test.assertDoesntExist(selector, msg);
    });
  };
  that.assertEquals = function(testValue, expected, msg){ 
    return assert(msg, function(){
      casper.test.assertEqual(testValue, expected, msg);
    });
  };
  that.assertEval = function(func, msg){ 
    var args = arguments;
    return assert(msg, function(){
        casper.test.assertEval.apply(casper.test, args);
    });
  };
  that.assertEvalEquals = function(func, expected, msg){ 
    var args = arguments;
    return assert(msg, function(){
        casper.test.assertEvalEquals.apply(casper.test, args);
    });
  };
  that.assertElementCount = function(selector, count, msg){ 
    return assert(msg, function(){
      casper.test.assertElementCount()(selector, count, msg); 
    });
  };
  that.assertExists = function(selector, msg){ 
    return assert(msg, function(){
      casper.test.assertExists(selector, msg); 
    });
  };
  that.assertFalsy = function(subject, msg){ 
    return assert(msg, function(){
      casper.test.assertFalsy(subject, msg); 
    });
  };
  that.assertField = function(inputName, expected, msg){ 
    return assert(msg, function(){
      casper.test.assertField(inputName, expected, msg); 
    });
  };
  that.assertHttpStatus = function(status, msg){ 
    return assert(msg, function(){
      casper.test.assertHttpStatus(status, msg); 
    });
  };
  that.assertMatch = function(subject, pattern, msg){ 
    return assert(msg, function(){
      casper.test.assertMatch(subject, pattern, msg); 
    });
  };
  that.assertNot = function(subject, msg){ 
    return assert(msg, function(){
      casper.test.assertNot(subject, msg); 
    });
  };
  that.assertNotEquals = function(subject, expected, msg){ 
    return assert(msg, function(){
      casper.test.assertNotEquals(subject, expected, msg); 
    });
  };
  that.assertNotVisible = function(selector, msg){ 
    return assertwrapper(msg, function(){
      casper.test.assertNotVisible(selector, msg); 
    });
  };
  that.assertRaises = function(func, args, msg){ 
    return assertwrapper(msg, function(){
      casper.test.assertRaises(func, args, msg); 
    });
  };
  that.assertSelectorDoesntHaveText = function(selector, text, msg){ 
    return assertwrapper(msg, function(){
      casper.test.assertSelectorDoesntHaveText(selector, text, msg); 
    });
  };
  that.assertSelectorHasText = function(selector, text, msg){ 
    return assertwrapper(msg, function(){
      casper.test.assertSelectorHasText(selector, text, msg); 
    });
  };
  that.assertResourceExists = function(testFx, msg){ 
    return assertwrapper(msg, function(){
      casper.test.assertResourceExists(testFx, msg); 
    });
  };
  that.assertTextExists = function(txt, msg){ 
    return assert(msg, function(){
      casper.test.assertTextExists(txt, msg); 
    });
  };
  that.assertTextDoesntExist = function(txt, msg){ 
    return assert(msg, function(){
      casper.test.assertTextDoesntExist(txt, msg); 
    });
  };
  that.assertTitle = function(expected, msg){ 
    return assert(msg, function(){
      casper.test.assertTitle(expected, msg); 
    });
  };
  that.assertTitleMatch = function(pattern, msg){ 
    return assert(msg, function(){
      casper.test.assertTitleMatch(pattern, msg); 
    });
  };
  that.assertType = function(input, type, msg){ 
    return assert(msg, function(){
      casper.test.assertType(input, type, msg); 
    });
  };
  that.assertUrlMatch = function(u, msg){ 
    return assert(msg, function(){
      casper.test.assertUrlMatch(new RegExp(casper.url(u)), msg);
    });
  };
  that.assertVisible = function(selector, msg){ 
    return assert(msg, function(){
      casper.test.assertVisible(selector, msg);
    });
  };
  // original expanded test
  that.assertTextNodeExists = function(selector, txt, msg){ 
    return assert(msg, function(){
      var s = selector;
      var t = txt;
      casper.test.assertEval.call(casper.test, function(selector, txt){
        return Array.prototype.filter.call(__utils__.findAll(selector), function(e, i, a){ 
          return txt === e.textContent;
        }).length > 0;
      }, msg, s, t);
    });
  };
  that.assertTextNodeDosentExist = function(selector, txt, msg){ 
    return assert(msg, function(){
      var s = selector;
      var t = txt;
      casper.test.assertEval.call(casper.test, function(selector, txt){
        return Array.prototype.filter.call(__utils__.findAll(selector), function(e, i, a){ 
          return txt === e.textContent;
        }).length < 1;
      }, msg, s, t);
    });
  };
  that.assertTextNodeMatch = function(selector, txt, msg){ 
    return assert(msg, function(){
      var s = selector;
      var t = txt;
      casper.test.assertEval(function(selector, txt){
        return Array.prototype.filter.call(__utils__.findAll(selector), function(e, i, a){ 
          return (new RegExp(txt)).test(e.textContent);
        }).length > 0;
      }, msg, s, t);
    });
  };

  return that;
};

module.exports = function(casper, assert){
  var F = function(){};
  F.prototype = Finklestein(casper, assert);
  return new F();
};
