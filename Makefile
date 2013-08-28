REPORTER = spec 

test:
	#@node test/webapp/app.js &
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers coffee:coffee-script --reporter $(REPORTER) test/
	#@kill -9 `ps x | grep -v grep | grep "node test/webapp/app.js" | awk '{print $$1'}` 

.PHONY: test
