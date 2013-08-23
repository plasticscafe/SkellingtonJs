# Basic Setting
option = 
  base : 
    url : 'http://www.google.co.jp/'
# Module Require
path = require('system').args[5].replace('--path=','')
zero = require(path + '/zero.js')(require, path, option)
# Page Define 
zero.addPage 'sample001.coffee'
zero.addPage 'sample002.coffee'
# Test Execute
zero.run 'テストのドキュメント'
