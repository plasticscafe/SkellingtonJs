should = require 'should'
# stab 
req = (module) ->
  if module == 'casper'
    create : (option) ->
      run: ->
      test:
        comment: ->
  else if module == 'utils'
    {} 
  else if module == '../sally.js'
    ->
      createHtml: ->
  else
    require(module)
# call jack 
jack = require('../jack')(req, '..')
# test start
describe 'test of Jack as SkellingtonJs main'
  describe 'basic test', ->
    it 'jack exist', ->
      jack.should.be.ok

  describe 'capter', ->
    it 'capter exist', ->
      jack.capter.should.be.ok

  describe 'section', ->
    it 'section exist', ->
      jack.section.should.be.ok

  describe 'getResult', ->
    it 'getResult Exist', ->
      jack.getResult.should.be.ok

  describe 'clearResult', ->
    it 'clearResult Exist', ->
      jack.clearResult.should.be.ok

  describe 'run', ->
    it 'run Exist', ->
      jack.run.should.be.ok

  describe 'start', ->
    it 'run Exist', ->
      jack.run.should.be.ok

  describe 'next', ->
    it 'next Exist', ->
      jack.run.should.be.ok

  # helper
  describe 'capture', ->
    it 'capture Exist', ->
      jack.capture.should.be.ok

  describe 'form', ->
    it 'form Exist', ->
      jack.form.should.be.ok

  describe 'url', ->
    it 'url Exist', ->
      jack.url.should.be.ok

  # test util
  describe 'comment', ->
    it 'comment Exist', ->
      jack.comment.should.be.ok

  describe 'resultJson', ->
    it 'comment Exist', ->
      jack.resultJson.should.be.ok

  describe 'createHtml', ->
    it 'createHtml Exist', ->
      jack.createHtml.should.be.ok
