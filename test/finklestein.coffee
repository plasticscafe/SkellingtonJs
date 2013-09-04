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
      formDescribe = (test, type, assert) ->
        ->
          it test + ' exist', ->
            finklestein[test].should.be.ok
          it test + ' call casper method', ->
            finklestein[test]()
            result.should.eql 'casper '+assert+' call :[args] input[type="'+type+'"]'
          it test + ' select no attr_name', ->
            finklestein[test]('msg')
            result.should.eql 'casper '+assert+' call :[args] input[type="'+type+'"],msg'
          it test + ' select attr_name', ->
            finklestein[test]('name', 'msg')
            result.should.eql 'casper '+assert+' call :[args] input[type="'+type+'"][name="name"],msg'

      describe 'hasSubmit', formDescribe 'hasSubmit', 'submit', 'assertExists'
      describe 'hasNoSubmit', formDescribe 'hasNoSubmit', 'submit', 'assertDoesntExist'
      describe 'hasButton', formDescribe 'hasButton', 'button', 'assertExists'
      describe 'hasNoButton', formDescribe 'hasNoButton', 'button', 'assertDoesntExist'
      describe 'hasInputText', formDescribe 'hasInputText', 'text', 'assertExists'
      describe 'hasNoInputText', formDescribe 'hasNoInputText', 'text', 'assertDoesntExist'

