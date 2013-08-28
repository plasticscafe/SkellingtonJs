should = require 'should'
fs = require 'fs'
# stab 
req = (module) ->
  if module == 'fs'
    isReadable: (judge) ->
      judge
    read: (tmpl) ->
      fs.readFileSync('template/doc.html').toString()
  else
    require(module)

# call sally 
sally = require('../sally')(req, '..')
describe 'test of Sally as docs template engine', ->
  describe 'basic test', ->
    it 'sally exist', ->
      sally.should.be.ok

  describe 'createHtml', ->
    it 'createHtml Exist', ->
      sally.createHtml.should.be.ok
