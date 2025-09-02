# logbrow

![LogBrow Screenshot](./screenshot.png)

Utility to browse logs in your browser. Pipe logs into the server and view them live at http://localhost:3966.

## Usage

```sh
cat your.log | logbrow
# or
some-app | logbrow
```

## Installation

Pre-built binaries are available on the [Releases page](https://github.com/mekariavre/logbrow/releases/latest).

## Development

- `npm install` to install dependencies
- `npm start` to run the server with ts-node

## Building & Installation

You can build and install LogBrow as a standalone executable using [pkg](https://github.com/vercel/pkg) and the provided Makefile:

1. Install dependencies:
	```sh
	npm install
	```
2. Build the binaries:
	```sh
	make pkg
	```
	The Makefile will automatically install `pkg` globally if it is not already available in your PATH.
	The binaries will be in the `dist/` folder (e.g., `dist/logbrow-macos`).

