#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin

# Start the server in development mode
s:
	node index.js
fs:
	forever -l log/forever.log -o log/output.log -e log/error.log -p $(shell pwd) --append --number 1000 start index.js

# Start the server in test mode
st:
	NODE_ENV=test node index.js
fst:
	NODE_ENV=test forever -l log/forever.log -o log/output.log -e log/error.log -p $(shell pwd) --append --number 1000 start index.js

# Start the server in production mode
sp:
	NODE_ENV=production node index.js
fsp:
	NODE_ENV=production forever -l log/forever.log -o log/output.log -e log/error.log -p $(shell pwd) --append --number 1000 start index.js

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.js' -not -path 'test/helpers/*')

# Generate minified assets from the /assets folder and output it to /public.
assets:
	mkdir -p public/js
	$(foreach file, $(shell find assets/js -maxdepth 1 -name '*.js' | cut -d '.' -f 1 | cut -d '/' -f 2-), \
		$(BIN)/browserify assets/$(file).js > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js; \
	)
	cp -r assets/js/bs assets/js/vendor public/js
	cp -r assets/img assets/fonts assets/icon-fonts assets/favicon.ico assets/humans.txt assets/sitemap.xml public
	mkdir -p public/css
	$(foreach file, $(shell find assets/less -name '*.less' | cut -d '.' -f 1 | cut -d '/' -f 3-), \
		$(BIN)/lessc --clean-css assets/less/$(file).less > public/css/$(file).css; \
	)

# Cleans up the initial GitHub app example files. After running this you might
# want to change the API_URL in config, mount your own app in lib/setup,
# set up your own fake API in test/helpers/integration, and delete this task.
clean:
	rm -rf apps/commits/
	rm collections/commits.js
	rm models/commit.js
	rm -rf public/assets/commits.js
	rm -rf public/assets/commits.css
	rm -rf public/assets/commits.min.js
	rm -rf public/assets/commits.min.css
	rm -rf components/search
	rm assets/commits.js
	rm assets/commits.styl
	rm test/models/commit.js
	rm LICENSE.md

.PHONY: test assets
