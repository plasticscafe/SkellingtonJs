should = require 'should'
# stab 
result = ''
assert = (msg, res) -> 
  result = res
  if msg != '' then msg else 'fail!'
casper = 
  url: (url)-> 'http://test.com/' + url
  test:
    comment: ->
    assertUrlMatch: (m) -> assert(m, 'casper assertUrlMatch call')
tests = [
  'assert', 'assertDoesntExist', 'assertEqual', 'assertEval', 'assertEvalEquals',
  'assertElementCount', 'assertExists', 'assertFalsy', 'assertField', 'assertHttpStatus',
  'assertMatch', 'assertNot', 'assertNotEquals', 'assertNotVisible', 'assertRaises',
  'assertSelectorDoesntHaveText', 'assertSelectorHasText', 'assertResourceExists',
  'assertTextExists', 'assertTextDoesntExist', 'assertTitle', 'assertTitleMatch',
  'assertType', 'assertUrlMatch', 'assertVisible'
]
for t in tests
  casper.test[t] = (->
    test = t
    (m) -> 
      res = 'casper '+test+' call'
      args = [ a for a in arguments when a? ].join(',')
      res = res + ' :[args] '+ args if args != '' 
      assert(m, res) 
  )()
# call jack 
finklestein = require('../finklestein')(casper, (msg, callback) -> callback(msg))
# test start
describe 'test of finklestein as SkellingtonJs tester', ->
  describe 'basic test', ->
    it 'finklestein exist', ->
      finklestein.should.be.ok

  describe 'casper tester wrapper', ->
    for t in tests
      describe t, ->
        it t+' exist', ->
          finklestein[t].should.be.ok
        it t+' call casper method', ->
          finklestein[t]()
          result.should.eql 'casper '+t+' call'

  describe 'skellington expanded tester', ->
    describe 'Page Property', ->
      describe 'isUrlMatch', ->
        it 'isUrlMatch exist', ->
          finklestein.isUrlMatch.should.be.ok
        it 'isUrlMatch call casper method', ->
          finklestein.isUrlMatch('url', 'msg')
          # 1st args is pattern ...
          result.should.eql 'casper assertUrlMatch call :[args] /http://test.com/url/,msg'

      describe 'isTitle', ->
        it 'isTitle exist', ->
          finklestein.isTitle.should.be.ok
        it 'isTitle call casper method', ->
          finklestein.isTitle('title', 'msg')
          result.should.eql 'casper assertTitle call :[args] title,msg'
      describe 'isTitleMatch', ->
        it 'isTitleMatch exist', ->
          finklestein.isTitleMatch.should.be.ok
        it 'isTitleMatch call casper method', ->
          finklestein.isTitleMatch(/title/, 'msg')
          result.should.eql 'casper assertTitleMatch call :[args] /title/,msg'
    
    describe 'Text', ->
      describe 'hasText', ->
        it 'hasText exist', ->
          finklestein.hasText.should.be.ok
        it 'hasText call casper method', ->
          finklestein.hasText('text', 'msg')
          result.should.eql 'casper assertTextExists call :[args] text,msg'
      describe 'hasNoText', ->
        it 'hasNoText exist', ->
          finklestein.hasNoText.should.be.ok
        it 'hasNoText call casper method', ->
          finklestein.hasNoText('text', 'msg')
          result.should.eql 'casper assertTextDoesntExist call :[args] text,msg'

    describe 'Link', ->
      describe 'hasLink', ->
        it 'hasLink exist', ->
          finklestein.hasLink.should.be.ok
        it 'hasLink call casper method', ->
          finklestein.hasLink('/test/', 'msg')
          result.should.eql 'casper assertExists call :[args] a[href="/test/"],msg'
      describe 'hasNoLink', ->
        it 'hasNoLink exist', ->
          finklestein.hasNoLink.should.be.ok
        it 'hasNoLink call casper method', ->
          finklestein.hasNoLink('/test/', 'msg')
          result.should.eql 'casper assertDoesntExist call :[args] a[href="/test/"],msg'

    describe 'Node Selector', ->
      describe 'hasNode', ->
        it 'hasNode exist', ->
          finklestein.hasNode.should.be.ok
        it 'hasNode call casper method', ->
          finklestein.hasNode('selector', 'msg')
          result.should.eql 'casper assertExists call :[args] selector,msg'

      describe 'hasNoNode', ->
        it 'hasNoNode exist', ->
          finklestein.hasNoNode.should.be.ok
        it 'hasNoNode call casper method', ->
          finklestein.hasNoNode('selector', 'msg')
          result.should.eql 'casper assertDoesntExist call :[args] selector,msg'


    describe 'Form Item', ->
      describe 'hasSubmit', ->
        it 'hasSubmit exist', ->
          finklestein.hasSubmit.should.be.ok
        it 'hasSubmit call casper method', ->
          finklestein.hasSubmit()
          result.should.eql 'casper assertExists call :[args] input[type="submit"]'
        it 'hasSubmit select no attr_name', ->
          finklestein.hasSubmit('msg')
          result.should.eql 'casper assertExists call :[args] input[type="submit"],msg'
        it 'hasSubmit select attr_name', ->
          finklestein.hasSubmit('submit', 'msg')
          result.should.eql 'casper assertExists call :[args] input[type="submit"][name="submit"],msg'
      describe 'hasNoSubmit', ->
        it 'hasNoSubmit exist', ->
          finklestein.hasNoSubmit.should.be.ok
        it 'hasNoSubmit call casper method', ->
          finklestein.hasNoSubmit()
          result.should.eql 'casper assertDoesntExist call :[args] input[type="submit"]'
        it 'hasNoSubmit select no attr_name', ->
          finklestein.hasNoSubmit('msg')
          result.should.eql 'casper assertDoesntExist call :[args] input[type="submit"],msg'
        it 'hasNoSubmit select attr_name', ->
          finklestein.hasNoSubmit('submit', 'msg')
          result.should.eql 'casper assertDoesntExist call :[args] input[type="submit"][name="submit"],msg'

      ###
      describe 'hasButton', ->
        it 'hasButton exist', ->
          finklestein.hasButton.should.be.ok
        it 'hasButton call casper method', ->
          finklestein.hasButton()
          result.should.eql 'casper assertExists call'

      describe 'hasNoButton', ->
        it 'hasNoButton exist', ->
          finklestein.hasNoButton.should.be.ok
        it 'hasNoButton call casper method', ->
          finklestein.hasNoButton()
          result.should.eql 'casper assertDoesntExist call'

      describe 'hasInputText', ->
        it 'hasInputText exist', ->
          finklestein.hasInputText.should.be.ok
        it 'hasInputText call casper method', ->
          finklestein.hasInputText()
          result.should.eql 'casper assertExists call'

      describe 'hasNoInput', ->
        it 'hasNoInput exist', ->
          finklestein.hasNoInput.should.be.ok
        it 'hasNoInput call casper method', ->
          finklestein.hasNoInput()
          result.should.eql 'casper assertDoesntExist call'

      describe 'hasInputPassword', ->
        it 'hasInputPassword exist', ->
          finklestein.hasInputPassword.should.be.ok
        it 'hasInputPassword call casper method', ->
          finklestein.hasInputPassword()
          result.should.eql 'casper assertExists call'

      describe 'hasNoInputPassword', ->
        it 'hasNoInputPassword exist', ->
          finklestein.hasNoInputPassword.should.be.ok
        it 'hasNoInputPassword call casper method', ->
          finklestein.hasNoInputPassword()
          result.should.eql 'casper assertDoesntExist call'

      describe 'hasTextarea', ->
        it 'hasTextarea exist', ->
          finklestein.hasTextarea.should.be.ok
        it 'hasTextarea call casper method', ->
          finklestein.hasTextarea()
          result.should.eql 'casper assertExists call'

      describe 'hasNoTextarea', ->
        it 'hasNoTextarea exist', ->
          finklestein.hasNoTextarea.should.be.ok
        it 'hasNoTextarea call casper method', ->
          finklestein.hasNoInputPassword()
          result.should.eql 'casper assertDoesntExist call'
      ###


