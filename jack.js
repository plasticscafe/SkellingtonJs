// SkellingtonJs is wrapper of casperJs
var Skellington = function(casper, require, p, o){  
  // modules
  var sally = require(p + '/sally.js')(require, p);
  // private 
  var option = o || {};
  option.capture = option.capture || {};
  option.base = option.base || {};
  option.output = option.output || {};
  var captureIndex = 0;
  var capterIndex = -1;
  var results = [];
  var capters = [];
  // public
  var that = that || {};
  //////////// methods  
  // Test Grouping
  that.capter = function(args, tests){
    var title = (typeof args === 'string') ? args : args.title; 
    if(typeof args !== 'object') args = {}; 
    capters.push(function(callback){
      casper.test.comment('***** '+title);
      results.push({
        title: title,
        description: args.description,
        prefix: args.prefix,
        sections : []
      });
      tests();
      casper.execute.call(casper, function(){
        if(callback.call(casper) !== 'nextCapter') casper.exit();
      });
    });
  };
  
  that.section = function(args){
    var title = (typeof args === 'string') ? args : args.title;
    if(typeof args !== 'object') args = {};
    var hidden = args.hidden || false;
    if(capters.length < 0) casper.die('No Test Capter');
    results[capterIndex].sections.push({
      title: title,
      description: args.description,
      captures: [],
      hidden: hidden,
      labels: []
    });
    if(args.capture !== false) casper.capture((typeof args.capture === 'string') ?  
        args.capture : undefined);
  };

  var getCapter = function(){
    return results[results.length -1];
  };
  var getSection = function(){
    var capter = getCapter();
    var sections = capter.sections;
    return sections[sections.length -1];
  };

  // Test Results
  that.getResult = function(){
    return results;
  };
  that.clearResult = function(){
    results = [];
  };

  var CapterEvent = function(){};
  CapterEvent.prototype = require('events').EventEmitter.prototype;
  var ce = new CapterEvent();
  ce.on('next', function(callback){
    if(capters.length < 1) require('casper').create().die('no test capter');
    var capter = capters.shift();
    capterIndex += 1;
    if(capters.length < 1){
      capter(callback2next);
    }else{
      capter(function(){
        ce.emit('next');  
        return 'nextCapter';
      });
    }
  });
  var callback2next;
  // Test Executer
  that.run = function(func){
    callback2next = func;
    ce.emit('next');
  };

  // Page Move
  that.start = (function(){
    var func = casper.start; 
    return function(u, callback){
      return func.call(casper, casper.url(u), callback);
    };
  })();

  that.next = (function(){
    var func = casper.thenOpen; 
    return function(u, callback){
      return func.call(casper, casper.url(u), callback);
    };
  })();

  ////// Helper
  // Capture SS
  that.capture = (function(){
    var func = casper.capture;
    return function(file){ 
      var section = getSection();
      if(section.hidden === true) return false;
      file = (file || 'ss') + '.png';
      var prefix = getCapter().prefix;
      prefix = (typeof prefix === 'undefined') ? '' : prefix + '_';
      captureIndex += 1;
      var imgDir = (option.output.dir) ? option.output.dir : '.';
      var imgPath = 'img/' + prefix + ('000' + captureIndex).slice(-3) + '_' + file;
      func.call(casper, imgDir + '/' + imgPath, {
        top: 0,
        left: 0,
        width: option.viewportSize.width,
        height: option.viewportSize.height
      });
      section.captures.push('./' + imgPath);
    };
  })(); 
  // Form send
  that.form = function(f, values){ 
    casper.evaluate(function(selector){
      var submit = document.createElement('input');
      submit.type = 'hidden';
      submit.name = '.submit';
      submit.value = 'submit';
      var formNode = (selector === 'form') ? document.forms[0] :
        document.querySelectorAll(f);
      formNode.appendChild(submit);
    }, f);
    casper.fill(f, values, true); 
  }; 

  /////// Util
  // create full URL
  that.url = function(path){ 
    var base = option.base.url || '';
    return base + path; 
  };

  /////// Test
  var assert = function(msg, func){
      var labels = getSection().labels; 
      if(typeof msg !== 'undefined') labels.push([msg, false]);
      var res = func(); 
      if(typeof msg !== 'undefined') labels[labels.length - 1][1] = true;
      return res;
  };
  var finklestein = require(p + '/finklestein.js')(casper, assert);
  for(var i in finklestein){
    that[i] = finklestein[i];
  }
  ///// test util
  that.comment = function(msg){
    casper.test.comment(msg);
  };

  ///// result formatter
  that.resultJson = function(){ 
    return JSON.stringify(results);
  };

  that.createHtml = function(title, file){ 
    var failures = casper.test.currentSuite.failures;
    var isSuccess = true;
    if(failures.length > 0){
      casper.echo(title + ': Test Fail!!', 'ERROR');
      isSuccess = false;
    }
    title = title || 'テストドキュメント';
    file = file || 'doc';
    var fileDir = (option.output.dir) ? option.output.dir : '.';
    var filePath = fileDir + '/' + file + '.html';
    var html = sally.createHtml(title, results, isSuccess);
    require('fs').write(filePath, html, 'w');
    return isSuccess;
  };
  // return 
  return that;
};

module.exports = function(require, path, option){
  option = option || {};
  if(typeof option.viewportSize === 'undefined') option.viewportSize = {width:1024, height:768};
  if(typeof option.output === 'undefined') option.output = {};
  if(typeof option.output.dir !== 'undefined') option.output.dir = './output';
  var c = require("casper").create(option); 
  c.execute = c.run;
  var skel = Skellington(c, require, path, option);
  for(var i in skel){  
    c[i] = skel[i];
  }
  c.utils = require("utils"); 
  return c;
};
