var Zero = function(require, path, option){
  var spath = require('system').args[6].replace('--spath=','');
  var testOnly = require('system').args[7].replace('--only=','').replace(/(^\s+)|(\s+$)/g, '');
  option = option || {}; 
  var that = that || {};
  ///// template
  var doc_title; 
  var fs = require('fs');
  var customTemplate = spath + '/template/index.html';
  var html = (fs.isReadable(customTemplate)) ? fs.read(customTemplate) :
    fs.read(path + '/template/index.html');
  // header 
  var res = html.match(/([\s\S.]*)<\!\-\- index start \-\->/m);
  var header_tmpl = res[1];
  // footer
  res = html.match(/<\!\-\- index end \-\->([\s\S.]*)/m);
  var footer_tmpl = res[1];
  // index 
  res = html.match(/<\!\-\- index start \-\->([\s\S.]*)<\!\-\- index end \-\->/m);
  var index_tmpl = res[1];
  // error
  var eRegex = new RegExp('<!-- error start -->([\\s\\S.]*)<!-- error end -->', 'm');
  ////// パーツ取得処理
  var header = function(title){
    doc_title = title || doc_title || 'テストドキュメントのリスト';
    return header_tmpl.replace(/\[% title %\]/g, doc_title);
  }; 
  var footer = function(){
    return footer_tmpl;
  };
  var index = function(title, path, isSuccess){
    var it = index_tmpl;
    if(isSuccess === false){
      it = it.replace(/>\[% title %\]/g, ' class="error">[% title %]');
      title = 'FAIL!!! :'+ title;
    }
    return it.replace(/\[% title %\]/g, title).replace(/\[% path %\]/g, './'+path+'.html');
  }; 
  var isTestError=false;
  // task stocker
  var stack = [];
  var StackEvent = function(){};
  StackEvent.prototype = require('events').EventEmitter.prototype;
  var sv = new StackEvent();
  var next = function(result){
    return function(jack, t, f){ 
      var isSuccess = jack.createHtml(t, f);
      if(!isSuccess) isTestError = true;
      sv.emit('next', t, f, isSuccess);
      return (result) ? 'nextCapter' : false;
    };
  };
  sv.on('next', function(t, f, isSuccess){
    if(typeof t !== 'undefined') pages.push({title: t, path: f, isSuccess: isSuccess});
    if(stack.length > 0){
      var script = stack.shift();
      var func = require(script);
      if(stack.length > 0){
        func(require, option, next(true));
      }else{
        func(require, option, next(false));
      }
    }else{
      createIndex();
    }
  });
  var pages = [];
  that.addPage = function(script){
    if(testOnly !== '' && testOnly !== script) return false;
    var scriptPath = spath + '/' + script;
    if(!fs.isFile(scriptPath)) require('casper').create().die('No Test File: ' + script);
    stack.push(scriptPath);
  };
  that.run = function(t){
      if(stack.length < 1) require('casper').create().die('No Test Files');
      doc_title = t;
      sv.emit('next');
  };
  that.getPages = function(){
    return pages;
  };
  var createIndex = function(){
    var i;
    var html = header(doc_title);
    for(i in pages){
      html += index(pages[i].title, pages[i].path, pages[i].isSuccess);
    }
    html += footer();
    html = (!isTestError) ? html.replace(eRegex, '') : html.replace(eRegex, "$1");
    var fileDir = (option.output.dir) ? option.output.dir : '.';
    var filePath = fileDir + '/' + 'index.html';
    require('fs').write(filePath, html, 'w');
  };
  return that;
};

module.exports = function(require, path, option){
  var F = function(){};
  F.prototype = Zero(require, path, option);
  return new F();
};
