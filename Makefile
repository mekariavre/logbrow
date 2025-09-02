# Makefile for LogBrow

build:
	npm run build

pkg: build
	if ! command -v pkg >/dev/null 2>&1; then \
		npm install -g pkg; \
	fi
	pkg . --out-path dist
	find dist -name 'logbrow-*' -exec chmod +x {} \;

clean:
	rm -rf dist

.PHONY: build pkg install clean
