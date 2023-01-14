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
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage