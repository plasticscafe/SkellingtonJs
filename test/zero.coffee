should = require 'should'
fs = require 'fs'
# stab 
req = (module) ->
  if module == 'casper'
    create : (option) ->
      run: ->
      test:
        comment: ->
  else if module == 'fs'
    isReadable: (judge) ->
      judge
    read: (tmpl) ->
      fs.readFileSync('template/index.html').toString()
  else if module == 'system'
    args: ['', '', '', '', '', '', '..', '']
  else if module == 'utils'
    {} 
  else if module == '../sally.js'
    ->
      createHtml: ->
  else
    require(module)
# call jack 
zero = require('../zero')(req, '..')
# test start
describe 'test of Zero as SkellingtonJs Documenter', ->
  describe 'basic test', ->
    it 'zero exist', ->
      zero.should.be.ok

  describe 'addPage', ->
    it 'addPage Exist', ->
      zero.addPage.should.be.ok

  describe 'run', ->
    it 'run Exist', ->
      zero.run.should.be.ok

  describe 'getPages', ->
    it 'getPages Exist', ->
      zero.getPages.should.be.ok
