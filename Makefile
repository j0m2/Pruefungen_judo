.DEFAULT_GOAL := build

.PHONY: build clean check

VERSION ?= 0.1.6

build:
	BUILD_VERSION=$(VERSION) node scripts/build.mjs

clean:
	node scripts/build.mjs --clean

check: build
	node --check src/app.js
	node --check src/rules.js
	node -e "JSON.parse(require('fs').readFileSync('src/data.json', 'utf8'))"
	@test -f dist/index.html
	@test -f dist/data.json
	@test -f dist/rules.js
