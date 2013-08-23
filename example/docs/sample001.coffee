module.exports = (require, option, next) -> 
  # Module Require
  path = require('system').args[5].replace('--path=','')
  jack = require(path + '/jack.js')(require, path, option)
  # Test Define 
  jack.capter {title:'検索画面', prefix:'001search'}, ->
    jack.start '/', -> 
      jack.section '検索ページ'
      jack.assertUrlMatch('/', 'ブラウザでhttp://google.co.jp/を指定すると検索ページを開く')
    jack.then -> jack.form("[action='/search']", {q: "skellington"})
    jack.then -> 
      jack.section title:'検索実行'
      jack.assertUrlMatch('search', '検索ページに遷移')
      jack.assertTextExists('Jack Skellington', '検索ワードに応じた結果が一覧に表示される')
  # Test Execute 
  jack.run ->
    next jack, '検索ページ', 'search'
