install:
	npm ci

start:
	gendiff '__fixtures__/flat-file1.json' '__fixtures__/flat-file2.json'

lint:
	npx eslint .

test:
	npm test

coverage:
	npm test -- --coverage --coverageProvider=v8

check: lint test
.PHONY: test