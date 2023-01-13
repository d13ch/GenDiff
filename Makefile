install:
	npm ci
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
stylish:
	node src/stylish.js
lint:
	npx eslint .