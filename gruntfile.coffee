module.exports = (grunt) ->
  'use strict'
  grunt.initConfig
    # package 
    pkg: grunt.file.readJSON 'package.json'
    # js構文チェック
    jshint: 
      all : ['jack.js', 'sally.js', 'zero.js']

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.registerTask 'default', ['jshint']
