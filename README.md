# JS Fonero Base

[![Build Status](https://travis-ci.org/fonero-project/js-fonero-base.svg)](https://travis-ci.org/fonero-project/js-fonero-base)
[![Code Climate](https://codeclimate.com/github/fonero-project/js-fonero-base/badges/gpa.svg)](https://codeclimate.com/github/fonero-project/js-fonero-base)
[![Coverage Status](https://coveralls.io/repos/fonero-project/js-fonero-base/badge.svg?branch=master&service=github)](https://coveralls.io/github/fonero-project/js-fonero-base?branch=master)
[![Dependency Status](https://david-dm.org/fonero-project/js-fonero-base.svg)](https://david-dm.org/fonero-project/js-fonero-base)

The fonero-base library is the lowest-level fonero helper library.  It consists of classes
to read, write, hash, and sign the xdr structures that are used in [fonero-core](https://github.com/fonero-project/fonero-core).
This is an implementation in JavaScript that can be used on either Node.js or web browsers.

* **[API Reference](https://fonero.github.io/js-fonero-base/)**

> **Warning!** Node version of this package is using [`ed25519`](https://www.npmjs.com/package/ed25519) package, a native implementation of [Ed25519](https://ed25519.cr.yp.to/) in Node.js, as an [optional dependency](https://docs.npmjs.com/files/package.json#optionaldependencies). This means that if for any reason installation of this package fails, `fonero-base` will fallback to the much slower implementation contained in [`tweetnacl`](https://www.npmjs.com/package/tweetnacl).
>
> If you are using `fonero-base` in a browser you can ignore this. However, for production backend deployments you should definitely be using `ed25519`. If `ed25519` is successfully installed and working `FoneroBase.FastSigning` variable will be equal `true`. Otherwise it will be `false`.

## Quick start

Using npm to include js-fonero-base in your own project:
```shell
npm install --save fonero-base
```

For browsers, [use Bower to install it](#to-use-in-the-browser). It exports a
variable `FoneroBase`. The example below assumes you have `fonero-base.js`
relative to your html file.

```html
<script src="fonero-base.js"></script>
<script>console.log(FoneroBase);</script>
```

## Install

### To use as a module in a Node.js project
1. Install it using npm:

  ```shell
  npm install --save fonero-base
  ```
2. require/import it in your JavaScript:

  ```js
  var FoneroBase = require('fonero-base');
  ```

### To self host for use in the browser
1. Install it using [bower](http://bower.io):

  ```shell
  bower install fonero-base
  ```

2. Include it in the browser:

  ```html
  <script src="./bower_components/fonero-base/fonero-base.js"></script>
  <script>console.log(FoneroBase);</script>
  ```

If you don't want to use install Bower, you can copy built JS files from the [bower-js-fonero-base repo](https://github.com/fonero-project/bower-js-fonero-base).

### To use the [cdnjs](https://cdnjs.com/libraries/fonero-base) hosted script in the browser
1. Instruct the browser to fetch the library from [cdnjs](https://cdnjs.com/libraries/fonero-base), a 3rd party service that hosts js libraries:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fonero-base/{version}/fonero-base.js"></script>
  <script>console.log(FoneroBase);</script>
  ```

Note that this method relies using a third party to host the JS library. This may not be entirely secure.

Make sure that you are using the latest version number. They can be found on the [releases page in Github](https://github.com/fonero-project/js-fonero-base/releases).

### To develop and test js-fonero-base itself
1. Clone the repo

  ```shell
  git clone https://github.com/fonero-project/js-fonero-base.git
  ```
2. Install dependencies inside js-fonero-base folder

  ```shell
  cd js-fonero-base
  npm install
  ```

## Usage
For information on how to use js-fonero-base, take a look at the docs in the [docs folder](./docs).

## Testing
To run all tests:
```shell
gulp test
```

To run a specific set of tests:
```shell
gulp test:node
gulp test:browser
```

Tests are also run on the [Travis CI js-fonero-base project](https://travis-ci.org/fonero-project/js-fonero-base) automatically.

## Documentation
Documentation for this repo lives inside the [docs folder](./docs).

## Contributing
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## Publishing to npm
```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
```
A new version will be published to npm **and** Bower by Travis CI.

npm >=2.13.0 required.
Read more about [npm version](https://docs.npmjs.com/cli/version).

## License
js-fonero-base is licensed under an Apache-2.0 license. See the [LICENSE](./LICENSE) file for details.
