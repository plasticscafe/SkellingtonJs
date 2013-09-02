module.exports = (require, option, next) -> 
  # Module Require
  path = require('system').args[5].replace('--path=','')
  jack = require(path + '/jack.js')(require, path, option)
  # Test Define 
  jack.capter {title:'検索されない画面', prefix:'002search'}, ->
    jack.start '/', -> 
      jack.section '検索ページ'
      jack.isUrlMatch('/', 'ブラウザでhttp://google.co.jp/を指定すると検索ページを開く')
    jack.then -> jack.form("[action='/search']", {q: "jack"})
    jack.then -> 
      jack.section title:'検索実行'
      jack.isUrlMatch('', '検索ページに遷移')
      jack.hasNoText('Jack Skellington', '検索ワードに応じた結果が一覧に表示されない')
  # Test Execute 
  jack.run ->
    next jack, '検索されないワード', 'no_search'
