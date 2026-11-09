.DEFAULT_GOAL := build

.PHONY: build clean check

build:
	node scripts/build.mjs

clean:
	node scripts/build.mjs --clean

check: build
	node --check src/app.js
	@test -f dist/index.html
