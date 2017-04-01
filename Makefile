build:
	@echo 'no build task specified.'

lint:
	yarn run standard

link:
	yarn link

install:
	yarn install

upstream/set:
	git remote add upstream https://github.com/brigadehub/theme-admin-c4sf.git

upstream/sync:
	git fetch upstream
	git checkout master
	git merge upstream/master

test:
	@echo make lint
	@$(MAKE) lint
	@echo make test/unit
	@$(MAKE) test/unit

test/unit:
	# yarn run ava -- **/*.unit.js
	@echo No tests specified

.PHONY: lint test build link upstream install
