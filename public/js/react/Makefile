SRC := $(shell find src -type f -name "*.*")
LOG_LEVEL ?= warn

node_modules: package.json
	npm install
	touch $@

build:
	node_modules/.bin/babel src --source-maps --out-file $@/bundle.js

clean:
	rm -rf build

.PHONY: build clean
