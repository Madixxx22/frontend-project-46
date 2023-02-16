install:
	npm ci

start:
	gendiff '__fixtures__/deep-file1.yml' '__fixtures__/deep-file2.yml' -f plain

lint:
	npx eslint .

test:
	npm test

coverage:
	npm test -- --coverage --coverageProvider=v8

check: lint test
.PHONY: test