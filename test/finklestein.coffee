should = require 'should'
# stab 
result = ''
assert = (msg, res) -> 
  result = res
  if msg != '' then msg else 'fail!'
casper = 
  url: -> 'http://test.com/'
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
      res = res + ' :[args] '.arguments.join('|') if arguments.length > 0
      assert(m, res ) 
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
    # url Match
    describe 'isUrlMatch', ->
      it 'isUrlMatch exist', ->
        finklestein.isUrlMatch.should.be.ok
      it 'isUrlMatch call casper method', ->
        finklestein.isUrlMatch()
        result.should.eql 'casper assertUrlMatch call'
