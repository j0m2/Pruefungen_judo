.DEFAULT_GOAL := build

.PHONY: build clean check

VERSION ?= 0.1.2

build:
	BUILD_VERSION=$(VERSION) node scripts/build.mjs

clean:
	node scripts/build.mjs --clean

check: build
	node --check src/app.js
	@test -f dist/index.html
