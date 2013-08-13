var Sally = function(path){
  var that = that || {};
  var fs = require('fs');
  var customTemplate = path + '/../../template/doc.html';
  var html = (fs.isReadable(customTemplate)) ? fs.read(customTemplate) :
    fs.read(path + '/template/doc.html');
  // header 
  var res = html.match(/([\s\S.]*)<\!\-\- capter start \-\->/m);
  var header_tmpl = res[1];
  // footer
  res = html.match(/<\!\-\- capter end \-\->([\s\S.]*)/m);
  var footer_tmpl = res[1];
  // capter 
  res = html.match(/<\!\-\- capter start \-\->([\s\S.]*)<\!\-\- capter end \-\->/m);
  var capter_tmpl = res[1];
  // section 
  var sRegex = new RegExp('<!-- section start -->([\\s\\S.]*)<!-- section end -->', 'm');
  res = capter_tmpl.match(sRegex);
  var section_tmpl = res[1];
  capter_tmpl = capter_tmpl.replace(sRegex, '[% section %]');
  // label 
  var lRegex = new RegExp('<!-- label start -->([\\s\\S.]*)<!-- label end -->', 'm');
  res = section_tmpl.match(lRegex);
  var label_tmpl = res[1];
  section_tmpl = section_tmpl.replace(lRegex, '[% label %]');
  // error
  var eRegex = new RegExp('<!-- error start -->([\\s\\S.]*)<!-- error end -->', 'm');
  ////// パーツ取得処理
  var header = function(title){
    title = title || 'テストドキュメント';
    return header_tmpl.replace(/\[% title %\]/g, title);
  }; 
  var footer = function(){
    return footer_tmpl;
  };
  var capter = function(title, description, sections){
    var res = capter_tmpl.replace(/\[% capter %\]/g, title);
    res = (typeof description !== 'undefined') ? 
      res.replace(/\[% capter_description %\]/g, description) :
      res.replace(/<(.+)>\[% capter_description %\]<\/(.+)>/g, '');
    return res.replace(/\[% section %\]/, getSections(sections));
  };
  var section = function(title, description, captures, labels){
    var res = section_tmpl.replace(/\[% section %\]/g, title);
    res = (typeof description !== 'undefined') ? 
      res.replace(/\[% section_description %\]/g, description) :
      res.replace(/<(.+)>\[% section_description %\]<\/(.+)>/g, '');
    res = (captures.length > 0) ? 
      res.replace(/\[% capture %\]/g, '<div><img src="'+captures.join('" /></div><div><img src="')+'" /></div>') :
      res.replace(/\[% capture %\]/g, '<span>no capture</span>');
    return res.replace(/\[% label %\]/, getLabels(labels));
  };
  var label = function(l){
    var lt = label_tmpl;
    if(l[1] === false) lt = lt.replace(/>\[% label %\]/g, ' class="error">[% label %]');
    var str = (l[1]) ? l[0] : 'FAIL!!! :'+ l[0];
    return lt.replace(/\[% label %\]/g, str);
  };
  var getSections = function(sections){
    var i;
    var res = '';
    for(i in sections){
      if(sections[i].hidden !== true) res += section(sections[i].title, sections[i].description,
          sections[i].captures, sections[i].labels); 
    }
    return res;
  };
  var getLabels = function(labels){
    var i;
    var res = '';
    for(i in labels){
      res += label(labels[i]); 
    }
    return res;
  };

  that.createHtml = function(title, data, isSuccess){
    var i;
    var html = header(title);
    for(i in data){
      c = data[i];
      html += capter(c.title, c.description, c.sections);
    }
    html += footer();
    return (isSuccess) ? html.replace(eRegex, '') : html.replace(eRegex, "$1");
  };
  return that;
};

module.exports = function(path){
  var F = function(){};
  F.prototype = Sally(path);
  return new F();
};
